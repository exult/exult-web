import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import {createHighlighter} from 'shiki';

export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

/** Apply Markdown export compatibility options without changing code examples. */
export function exportMarkdown(source, {imagesAsText = false, linkTargets = {}} = {}) {
  source = source.replace(/\r\n?/g, '\n').trim() + '\n';
  const lines = source.split('\n');
  const blocks = new MarkdownIt({html:true}).parse(source, {})
    .filter(token => ['fence','code_block','html_block'].includes(token.type) && token.map)
    .map(token => token.map);
  function inline(text) {
    const prose = value => {
      if(imagesAsText) value = value.replace(/!\[(\[[^\]\n]*\]|[^\]\n]*)\]\([^\)\n]*\)/g, (_, alt) => alt);
      return value.replace(/\]\(([^)\n]+)\)/g, (match, url) => Object.hasOwn(linkTargets,url) ? `](${linkTargets[url]})` : match);
    };
    let result = '', cursor = 0;
    const ticks = /`+/g;
    let opening;
    while((opening = ticks.exec(text))) {
      // Escaped backticks are prose, not code delimiters.
      const slashes = text.slice(0, opening.index).match(/\\+$/)?.[0].length || 0;
      if(slashes % 2) continue;
      const start = ticks.lastIndex;
      const closingTicks = /`+/g;
      closingTicks.lastIndex = start;
      let closing;
      while((closing = closingTicks.exec(text)) && closing[0].length !== opening[0].length) {}
      if(!closing) continue;
      let code = text.slice(start, closing.index).replace(/\n/g, ' ');
      // CommonMark strips one surrounding space when the code is not all spaces.
      if(code.startsWith(' ') && code.endsWith(' ') && /[^ ]/.test(code)) code = code.slice(1,-1);
      result += prose(text.slice(cursor, opening.index));
      result += code.startsWith('-') ? `<code>${escapeHtml(code)}</code>` : text.slice(opening.index, closingTicks.lastIndex);
      cursor = closingTicks.lastIndex;
      ticks.lastIndex = cursor;
    }
    return result + prose(text.slice(cursor));
  }
  let result = '', cursor = 0;
  for(const [start,end] of blocks) {
    result += inline(lines.slice(cursor,start).join('\n'));
    if(start > cursor) result += '\n';
    result += lines.slice(start,end).join('\n') + '\n';
    cursor = end;
  }
  return result + inline(lines.slice(cursor).join('\n'));
}

export function expandIncludes(source, root, stack = []) {
  return source.replace(/\{\{include:([\w/-]+)\}\}/g, (_, name) => {
    if (stack.includes(name)) throw new Error(`Circular documentation include: ${[...stack, name].join(' -> ')}`);
    const file = path.resolve(root, `${name}.md`);
    if (!file.startsWith(path.resolve(root) + path.sep)) throw new Error(`Invalid include: ${name}`);
    return expandIncludes(fs.readFileSync(file, 'utf8'), root, [...stack, name]);
  });
}

export async function createDocumentation(root) {
  const grammar = JSON.parse(fs.readFileSync(path.join(root, '../usecode.tmLanguage.json'), 'utf8'));
  grammar.name = 'usecode';
  const highlighter = await createHighlighter({langs: [grammar], themes: ['github-light','github-dark']});
  const intrinsics = new Set(fs.readdirSync(path.join(root, 'intrinsics')).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)));
  const directives = new Set(fs.readdirSync(path.join(root, 'directives')).map(f => f.slice(0, -3)));
  const commands = new Set(fs.readdirSync(path.join(root, 'scriptop')).map(f => f.slice(0, -3)));
  function reference(word) {
    const intrinsic = word.replace(/^UI_/, '');
    if (intrinsics.has(intrinsic)) return `reference-intrinsics-${intrinsic}.html`;
    if (word.startsWith('#') && directives.has(word.slice(1))) return `reference-directives-${word.slice(1)}.html`;
    if (commands.has(word)) return `reference-scriptop-${word}.html`;
    return null;
  }
  const cache = new Map();
  function highlight(code, block = true, links = true) {
    const key = JSON.stringify([code,block,links]);
    if(cache.has(key)) return cache.get(key);
    const {tokens} = highlighter.codeToTokens(code, {
      lang:'usecode', themes:{light:'github-light',dark:'github-dark'}, includeExplanation:true,
      // Upstream dark-theme comments fall below 4.5:1 on both code and page backgrounds.
      colorReplacements:{'github-dark':{'#6a737d':'#9da7b1'}}
    });
    const content = tokens.map(line => '<span class="line">' + line.map(token => {
      let text = escapeHtml(token.content);
      // Scope checks keep words inside strings and comments from becoming links.
      if (links && /^#?[A-Za-z_]\w*$/.test(token.content)) {
        const url = reference(token.content);
        const scopes = token.explanation?.flatMap(part=>part.scopes.map(scope=>scope.scopeName)) || [];
        if (url && !scopes.some(scope=>/^(comment|string)\./.test(scope))) text = `<a href="${url}">${text}</a>`;
      }
      const style = Object.entries(token.htmlStyle).map(([name,value])=>`${name}:${value}`).join(';');
      return `<span style="${style}">${text}</span>`;
    }).join('') + '</span>').join('\n');
    const result = block ? `<pre class="usecode" tabindex="0" role="group" aria-label="Usecode example"><code>${content}</code></pre>\n` : `<code class="usecode">${content}</code>`;
    cache.set(key,result);
    return result;
  }
  const markdown = new MarkdownIt({html:true, highlight: code => highlight(code)});
  markdown.renderer.rules.code_inline = (tokens, i) => highlight(tokens[i].content, false);
  // Markdown links already supply their own anchor; do not nest code links inside them.
  const defaultInline = markdown.renderer.renderInline.bind(markdown.renderer);
  markdown.renderer.renderInline = (tokens, options, env) => {
    let insideLink = false;
    return tokens.map(token => {
      if (token.type === 'link_open') insideLink = true;
      const result = token.type === 'code_inline' ? highlight(token.content, false, !insideLink) : defaultInline([token], options, env);
      if (token.type === 'link_close') insideLink = false;
      return result;
    }).join('');
  };
  const read = name => expandIncludes(fs.readFileSync(path.join(root, name + '.md'), 'utf8'), root);
  return {read, html: source => markdown.render(source), naturalDocs: source => renderText(markdown.parse(source, {}), true), highlight, dispose: () => highlighter.dispose()};
}

const decode = s => s.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#124);/g, c => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' ','&#124;':'|'}[c]));
function wrapText(text, width = 80) {
  return text.split('\n').map(paragraph => {
    const lines = [''];
    for(const word of paragraph.split(/\s+/)) {
      if(lines.at(-1).length + word.length + 1 > width && lines.at(-1)) lines.push(word);
      else lines[lines.length-1] += (lines.at(-1) ? ' ' : '') + word;
    }
    return lines.join('\n');
  }).join('\n');
}
function inlineText(tokens = []) {
  return tokens.map(t => {
    if (t.type === 'image') return t.content;
    if (t.type === 'softbreak' || t.type === 'hardbreak') return '\n';
    if (t.type === 'html_inline') return /<br\s*\/?\s*>/i.test(t.content) ? '\n' : '';
    if (t.type === 'strong_open' || t.type === 'strong_close') return '*';
    if (t.type === 'em_open' || t.type === 'em_close') return '/';
    return ['text','code_inline'].includes(t.type) ? decode(t.content) : '';
  }).join('');
}

/** Render parsed Markdown, rather than stripping HTML (which would damage code). */
export function renderText(tokens, naturalDocs = false) {
  let result = '', heading = null, cell = false, row = [], rows = null;
  const lists = [];
  const line = s => { result += s; };
  for (const t of tokens) {
    switch(t.type) {
      case 'heading_open': heading = Number(t.tag.slice(1)); break;
      case 'heading_close': heading = null; break;
      case 'inline': {
        const text = inlineText(t.children);
        if (cell) row.push(text);
        else if (heading) line(naturalDocs ? `${heading <= 2 ? 'Title: ' : heading === 3 ? 'Function: ' : ''}${text}${heading > 3 ? ':' : ''}\n\n` : `${text}\n${(heading <= 2 ? '=' : '-').repeat(Math.min(80, text.length))}\n\n`);
        else line(wrapText(text, naturalDocs ? 77 : 80));
        break;
      }
      case 'paragraph_close': if (!cell) line('\n\n'); break;
      case 'fence': line(naturalDocs ? `Definitions:\n${t.content.split('\n').filter((s,i,a) => i < a.length-1 || s).map(s => '> ' + s).join('\n')}\n\n` : t.content + '\n'); break;
      case 'bullet_list_open': lists.push(null); break;
      case 'ordered_list_open': lists.push(Number(t.attrGet('start') || 1)); break;
      case 'bullet_list_close': case 'ordered_list_close': lists.pop(); break;
      case 'list_item_open': line('  '.repeat(lists.length-1) + (lists.at(-1) === null ? '* ' : `${lists[lists.length-1]++}. `)); break;
      case 'table_open': rows = []; break;
      case 'tr_open': row = []; break;
      case 'td_open': case 'th_open': cell = true; break;
      case 'td_close': case 'th_close': cell = false; break;
      case 'tr_close': rows.push(row); break;
      case 'table_close': {
        if(naturalDocs) {
          for(const r of rows.slice(1)) line(r.join(' - ')+'\n');
          line('\n'); rows = null; break;
        }
        const widths = rows[0].map((_, i) => Math.min(45, Math.max(...rows.map(r => (r[i] || '').length))));
        for(const r of rows) line(r.map((s,i) => i === r.length-1 ? s : s.padEnd(widths[i])).join(' | ')+'\n');
        line('\n'); rows = null; break;
      }
    }
  }
  result = result.trim() + '\n';
  return naturalDocs ? result.split('\n').map(s => s ? '// ' + s : '//').join('\n') + '\n' : result;
}
