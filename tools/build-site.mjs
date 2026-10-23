import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createDocumentation, escapeHtml as esc, exportMarkdown} from './usecode.mjs';
import {legacyRedirects} from './legacy-redirects.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'seventowers');
const read = p => fs.readFileSync(path.join(site,p), 'utf8');
const json = p => JSON.parse(read(p));
const downloadNames = [['exultmods','keyring','sifixes','avatarpack'], ['usecode','tutorials','reference','highlighters'], ['ultimaicons']];

/** Map the finite set of old query-string routes to real static files. */
export function staticUrl(value) {
  const decoded = value.replace(/&amp;/g, '&');
  const match = decoded.match(/^(?:(?:https?:)?\/\/(?:exult\.info|exult\.sourceforge\.net)\/seventowers\/)?(index|news|links|404|downloads|code|ucc_ref)\.php(?:\?([^#]*))?(#.*)?$/);
  if (!match) return value;
  const [, page, query, hash = ''] = match;
  const q = new URLSearchParams(query);
  let target;
  if(page === 'downloads') target = downloadNames[Number(q.get('section') || 0)]?.[Number(q.get('page') || 0)] + '.html';
  else if(page === 'code') {
    const name = (q.get('DATAFILE') || 'exult_intrinsics.dat').replace(/\.dat$/, '');
    const output = q.get('OUTPUT');
    target = output === 'text' ? `${name}.md` : output === 'naturaldocs' ? `docs/${name}.naturaldocs.txt` : `${name}.html`;
  } else if(page === 'ucc_ref') {
    const type = Number(q.get('TYPE') || 5);
    const category = ({3:'scriptop', 5:'intrinsics', 6:'directives', 50:'reference'})[type] || 'intrinsics';
    let name = q.get('DATAFILE') || (type === 6 ? 'line' : '');
    name = name.replace(/^UI_/, '').replace(/^#/, '');
    target = `reference-${category}-${name}.html`;
  } else target = page === 'news' && q.has('showall') ? 'news-archive.html' : `${page}.html`;
  if(target === 'undefined.html') throw new Error(`Unknown download route: ${value}`);
  const absolute = /^https?:|^\/\//.test(decoded);
  return (absolute ? '/seventowers/' : '') + target + hash;
}

export const rewriteLinks = html => html.replace(/\b(href|src)="([^"]*)"/g, (_, attr, url) => `${attr}="${staticUrl(url)}"`);

function page(title, banner, content, active = '', submenu = '') {
  const nav = [['index','Home','home'],['exultmods','Exult Mods','exult'],['usecode','Usecode C','usecode'],['ultimaicons','Ultima Icons','icons'],['links','Links','links'],['news','News','news']];
  return rewriteLinks(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Seven Towers: ${esc(title)}</title>
  <link href="default.css" rel="stylesheet">
  <link rel="preload" href="fonts/UnifrakturCook-Bold.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="icon" href="images/home.png" type="image/png">
</head>
<body>
  <input type="checkbox" id="readable-titles" class="font-toggle">
  <label for="readable-titles" class="font-toggle-label">Use readable titles</label>
  <h1 id="top" class="page-title"><span class="title-text">${esc(banner)}</span></h1>
  <nav aria-label="Main"><ul class="navbar">${nav.map(([url,text,icon]) => `<li>${url === active ? `<span class="navbar" aria-current="page">` : `<a href="${url}.html">`}<img src="images/${icon}.png" alt="">&nbsp;&nbsp;${text}${url === active ? '</span>' : '</a>'}</li>`).join('')}</ul></nav>
  ${submenu}
  <main>${content}</main>
</body>
</html>
`);
}

function* files(dir) {
  for(const entry of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name,'en'))) {
    const file = path.join(dir,entry.name);
    if(entry.isDirectory()) yield* files(file); else yield file;
  }
}

function copyPublic(output) {
  // Build from a deliberate public-file set; never upload source, dependencies or credentials.
  for(const e of fs.readdirSync(root,{withFileTypes:true})) {
    if(e.isFile() && (/\.(?:html|css|js|txt|png|ico|svg)$/.test(e.name) || ['ChangeLog','README.1ST'].includes(e.name))) fs.copyFileSync(path.join(root,e.name),path.join(output,e.name));
  }
  for(const dir of ['images','.well-known','snapshots']) if(fs.existsSync(path.join(root,dir))) fs.cpSync(path.join(root,dir),path.join(output,dir),{recursive:true});
  const dest = path.join(output,'seventowers');
  fs.mkdirSync(dest,{recursive:true});
  for(const dir of ['images','files','docs','fonts']) fs.cpSync(path.join(site,dir),path.join(dest,dir),{recursive:true});
  for(const name of ['default.css','favicon.ico']) fs.copyFileSync(path.join(site,name),path.join(dest,name));
  fs.mkdirSync(path.join(dest,'usecode'),{recursive:true});
  for(const f of files(path.join(site,'usecode'))) if(/\.(?:uc|txt)$/.test(f)) fs.copyFileSync(f,path.join(dest,'usecode',path.basename(f)));
}

function downloadContent(data, section, current) {
  const desc = data.descriptions[current];
  const notice = Array.isArray(data.notice) ? data.notice[current] : data.notice;
  const paragraphs = list => list.map(p=>`<p>${p}</p>`).join('\n');
  let body = `<h2>${desc.NAME}</h2>${desc.SHOWICON ? `<img class="logoimg" src="images/${desc.ICON}.png" alt="">` : ''}${paragraphs(desc.TEXT)}`;
  body += `<aside class="box"><h3>${notice.TITLE}</h3>${paragraphs(notice.TEXT)}</aside>`;
  if(section === 1) body += '<p><a href="reference-index.html">Browse intrinsic, script command, and compiler directive reference pages</a></p>';
  if(section === 2) {
    return body + '<div class="icon-gallery">' + data.files.flat().map(entry => {
      const url = `${entry.DIR}/${entry.NAME}.${entry.EXT}`;
      const previews = entry.ICONS.map(icon => {
        const dimensions = icon.slice(icon.lastIndexOf('-')+1);
        return `<a class="icon-preview" href="images/${icon}.png" download><span class="icon-preview-image"><img src="images/${icon}.png" alt="${esc(entry.NAME)} ${esc(dimensions)} preview"></span><span>${esc(dimensions)}</span></a>`;
      }).join('');
      const stat = fs.statSync(path.join(site,url));
      return `<section class="icon-download"><div class="icon-previews">${previews}</div><p><a href="${url}" download>${esc(entry.TITLE)}</a></p><p class="icon-file-info">${Math.ceil(stat.size/1024)} KiB · ${stat.mtime.toISOString().slice(0,10)}</p></section>`;
    }).join('') + '</div>';
  }
  const entries = [];
  for(const [filename, entry] of Object.entries(data.catalog)) {
    if(current && current !== entry.PAGE) continue;
    const icon = data.icons[entry.PAGE];
    if(filename.endsWith('.md')) {
      const name = filename.slice(0,-3);
      entries.push({url:`${name}.html`, title:entry.TITLE, icons:[icon], blurb:`Markdown version: <a href="${name}.md">view source</a>, <a href="${name}.md" download>save to disk</a>. <a href="docs/${name}.naturaldocs.txt" download>Natural Docs source</a>.`});
    } else {
      // Snapshot archives may be fetched before building, or already present locally.
      const directories = ['../snapshots','files'].filter(dir=>fs.existsSync(path.join(site,dir,filename)));
      // SourceForge keeps snapshot archives separately from the Git checkout.
      for(const dir of directories.length ? directories : ['../snapshots']) entries.push({url:dir === '../snapshots' ? `https://exult.sourceforge.io/snapshots/${filename}` : `${dir}/${filename}`,title:entry.TITLE,icons:[icon],blurb:entry.README || ''});
    }
  }
  body += `<table class="download-links" id="download-links-${section}-${current}"><thead><tr><th scope="col">Download</th><th scope="col">Size</th><th scope="col">Last modified</th></tr></thead><tbody>`;
  for(const entry of entries) {
    const local = path.join(site,entry.url);
    const stat = fs.existsSync(local) ? fs.statSync(local) : null;
    body += `<tr><td class="link-column"><div class="download-entry"><div class="download-icons">${entry.icons.map(i=>`<img src="images/${i}.png" alt="">`).join('')}</div><div class="download-copy"><a href="${entry.url}">${entry.title}</a>${entry.blurb ? `<div class="download-details">${entry.blurb}</div>` : ''}</div></div></td><td class="size-column">${stat ? Math.ceil(stat.size/1024)+' KiB' : ''}</td><td class="datetime-column">${stat ? stat.mtime.toISOString().slice(0,16).replace('T',' ')+' UTC' : ''}</td></tr>`;
  }
  return body + '</tbody></table>';
}

export async function build(output = path.join(root,'dist')) {
  output = path.resolve(output);
  // Only the dedicated staging directory is ever cleaned.
  if(output !== path.join(root,'dist')) throw new Error('Build output must be the repository dist directory');
  fs.mkdirSync(output,{recursive:true});
  for(const entry of fs.readdirSync(output)) fs.rmSync(path.join(output,entry),{recursive:true,force:true});
  copyPublic(output);
  const destination = path.join(output,'seventowers');
  const write = (name, value) => fs.writeFileSync(path.join(destination,name),value);
  const references = Object.fromEntries(['intrinsics','scriptop','directives','reference'].map(category=>[category,fs.readdirSync(path.join(site,'usecode',category)).filter(f=>f.endsWith('.md')).map(f=>f.slice(0,-3))]));
  write('.htaccess',legacyRedirects(references));
  for(const name of ['index','links','news','news-archive','404']) {
    const info = json(`content/${name}.json`);
    const html = page(info.headline,info.banner,read(`content/${name}.html`),name);
    write(`${name}.html`,html);
    if(name === '404') write('404.shtml',html.replace('<head>','<head>\n  <base href="/seventowers/">'));
  }
  for(const section of [0,1,2]) {
    const data = json(`content/downloads-${section}.json`);
    const panels = data.heads.map((_,i)=>downloadContent(data,section,i));
    for(const [current,name] of downloadNames[section].entries()) {
      const content = section === 2 ? panels[0] : `<div class="section-tabs" role="radiogroup" aria-label="${esc(data.banner)} sections">${data.heads.map((head,i)=>{
        const id = `tab-${downloadNames[section][i]}`;
        return `<input class="tab-option" type="radio" name="download-section" id="${id}"${i===current ? ' checked' : ''}><label class="tab-label" id="${id}-label" for="${id}">${esc(head)}</label><section class="tab-panel" aria-labelledby="${id}-label">${panels[i]}</section>`;
      }).join('')}</div><script src="../shapshot_file_details.js"></script><script src="../download.js"></script>`;
      write(name+'.html',page(data.heads[current],data.banner,content,downloadNames[section][0]));
    }
  }
  const docs = await createDocumentation(path.join(site,'usecode'));
  try {
    const groups = json('usecode/intrinsic-groups.json');
    const relations = json('usecode/script-relations.json');
    const intrinsic = name => docs.read(`intrinsics/defs/${name}`) + '\n\n' + docs.read(`intrinsics/${name}`);
    let full = '## General Definitions\n\n' + docs.read('reference/intrinsic_reference') + '\n\n';
    for(const [group,members] of Object.entries(groups.relations)) {
      full += `## ${groups.groups[group][0]}\n\n${groups.groups[group][1]}\n\n`;
      for(const name of Object.keys(members)) full += `<a id="${name}"></a>\n\n### UI_${name}\n\n${intrinsic(name)}\n\n`;
    }
    const grouped = new Set(Object.values(groups.relations).flatMap(Object.keys));
    const ungrouped = fs.readdirSync(path.join(site,'usecode/intrinsics')).filter(f=>f.endsWith('.md') && !grouped.has(f.slice(0,-3)));
    if(ungrouped.length) {
      full += '## Other documented intrinsics\n\n';
      for(const file of ungrouped) {
        const name=file.slice(0,-3);
        full += `<a id="${name}"></a>\n\n### UI_${name}\n\n${intrinsic(name)}\n\n`;
      }
    }
    for(const [name,source] of [['exult_intrinsics',full], ...['ucc_scripting','ucc_tutorial','ucc_reference'].map(n=>[n,docs.read(n)])]) {
      const exports = `<p><a href="${name}.md" download>Download Markdown</a> | <a href="docs/${name}.naturaldocs.txt">Natural Docs source</a></p>`;
      write(name+'.html',page(name.replaceAll('_',' '),'Usecode C',exports+docs.html(source),'usecode'));
      // Keep exports beside their HTML pages so relative links and images work in both formats.
      write(`${name}.md`,exportMarkdown(source,{imagesAsText:name === 'exult_intrinsics'}));
      write(`docs/${name}.naturaldocs.txt`,docs.naturalDocs(name === 'exult_intrinsics' ? docs.read('reference/naturaldocs_intrinsics')+'\n\n'+source : source));
    }
    for(const category of ['intrinsics','scriptop','directives','reference']) {
      for(const file of fs.readdirSync(path.join(site,'usecode',category)).filter(f=>f.endsWith('.md'))) {
        const name = file.slice(0,-3);
        const related = category === 'intrinsics' ? groups.relations : category === 'scriptop' ? relations : {};
        const relationName = ({actor:'actor frame',next:'next frame',previous:'previous frame'})[name] || name;
        const names = Object.values(related).find(group=>Object.hasOwn(group,relationName))?.[relationName] || [];
        const aliases = {'actor frame':'actor','next frame':'next','previous frame':'previous'};
        const relatedHtml = names.filter(n=>n!==name).map(n=>`<li><a href="reference-${category}-${aliases[n] || n}.html">${esc(n)}</a></li>`).join('');
        const source = category === 'intrinsics' ? intrinsic(name) : docs.read(`${category}/${name}`);
        write(`reference-${category}-${name}.html`,page(name,'UCC Reference',`<h2>${esc(category === 'intrinsics' ? 'UI_'+name : name)}</h2>`+docs.html(source)+(relatedHtml ? `<h3>Related ${category === 'intrinsics' ? 'intrinsics' : 'script commands'}</h3><ul>${relatedHtml}</ul>` : '')+'<p><a href="exult_intrinsics.html">Full intrinsic reference</a> | <a href="reference-reference-intrinsic_reference.html">Reference definitions</a></p>','usecode'));
      }
    }
    write('reference-index.html',page('Reference','UCC Reference','<h2>Usecode C reference</h2>'+['intrinsics','scriptop','directives'].map(category=>`<h3>${category}</h3><ul>${fs.readdirSync(path.join(site,'usecode',category)).filter(f=>f.endsWith('.md')).map(f=>`<li><a href="reference-${category}-${f.slice(0,-3)}.html">${esc(f.slice(0,-3))}</a></li>`).join('')}</ul>`).join(''),'usecode'));
  } finally { docs.dispose(); }
  // Rewrite old Seven Towers URLs in the main site as well.
  for(const file of files(output)) if(file.endsWith('.html')) {
    const html = fs.readFileSync(file,'utf8');
    fs.writeFileSync(file,rewriteLinks(html));
  }
  console.log(`Built static website in ${output}`);
}

if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
