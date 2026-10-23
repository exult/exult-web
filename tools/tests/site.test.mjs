import {test, before} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {build, root, staticUrl} from '../build-site.mjs';
import {createDocumentation, expandIncludes} from '../usecode.mjs';

before(async()=>{await build();});
const output = path.join(root,'dist');
const read = name => fs.readFileSync(path.join(output,'seventowers',name),'utf8');
function* walk(dir) { for(const e of fs.readdirSync(dir,{withFileTypes:true})) { const p=path.join(dir,e.name); if(e.isDirectory()) yield* walk(p); else yield p; } }

test('legacy routes become explicit static files, regardless of parameter order',()=>{
  assert.equal(staticUrl('downloads.php?page=2&amp;section=0'),'sifixes.html');
  assert.equal(staticUrl('ucc_ref.php?DATAFILE=UI_resurrect&TYPE=5'),'reference-intrinsics-resurrect.html');
  assert.equal(staticUrl('ucc_ref.php?TYPE=6'),'reference-directives-line.html');
  assert.equal(staticUrl('code.php?OUTPUT=text&DATAFILE=ucc_scripting.dat'),'docs/ucc_scripting.txt');
  assert.equal(staticUrl('http://exult.info/seventowers/downloads.php?section=0&page=3'),'/seventowers/avatarpack.html');
  assert.equal(staticUrl('news.php?showall=1'),'news-archive.html');
  assert.equal(staticUrl('https://example.com/index.php'),'https://example.com/index.php');
});

test('every generated local link and image resolves',()=>{
  const missing=[];
  for(const f of walk(path.join(output,'seventowers'))) if(f.endsWith('.html')) {
    const html=fs.readFileSync(f,'utf8');
    assert.doesNotMatch(html, /\{\{include:/);
    for(const [, url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      if(/^[a-z]+:|^\/\//i.test(url)) continue;
      assert.doesNotMatch(url, /\.php(?:[?#]|$)/);
      const target=url.split(/[?#]/)[0];
      const absolute=target.startsWith('/')?path.join(output,target):path.resolve(path.dirname(f),target);
      if(!fs.existsSync(absolute)) missing.push(`${path.basename(f)}: ${url}`);
    }
  }
  assert.deepEqual(missing,[]);
});

test('publication contains no PHP, data sources, tests or build dependencies',()=>{
  assert(!fs.existsSync(path.join(output,'tools')));
  assert(!fs.existsSync(path.join(output,'node_modules')));
  assert(!fs.existsSync(path.join(output,'seventowers/content')));
  for(const f of walk(output)) assert.doesNotMatch(f,/\.(?:php\d?|inc|dat|md)$/);
});

test('all intrinsic pages and prototypes contribute to the combined exports',()=>{
  const source=path.join(root,'seventowers/usecode/intrinsics');
  const html=read('exult_intrinsics.html');
  const text=read('docs/exult_intrinsics.txt');
  const nd=read('docs/exult_intrinsics.naturaldocs.txt');
  for(const f of fs.readdirSync(source).filter(f=>f.endsWith('.md'))) {
    const name=f.slice(0,-3);
    assert(read(`reference-intrinsics-${name}.html`).includes('UI_'+name));
    assert(html.includes(`id="${name}"`),name);
    assert(text.includes('UI_'+name),name);
    assert(nd.includes('// Function: UI_'+name),name);
  }
  assert.doesNotMatch(text,/<span|<a |```|\{\{/);
  assert(text.includes('obj->'));
  assert(nd.includes('Peter M Dodge'));
});

test('downloads use the main Exult metadata updater and retain remote archives',()=>{
  const html=read('keyring.html');
  assert(html.includes('https://exult.sourceforge.io/snapshots/Keyring.zip'));
  for(const cls of ['link-column','size-column','datetime-column']) assert(html.includes(cls));
  assert(html.includes('../download.js'));
  assert(read('reference.html').includes('docs/exult_intrinsics.txt'));
});

test('grammar highlights code, links intrinsics, and leaves strings and comments alone',async()=>{
  const docs=await createDocumentation(path.join(root,'seventowers/usecode'));
  try {
    const html=docs.highlight('UI_add_answer("UI_get_random"); // UI_get_random');
    assert(html.includes('reference-intrinsics-add_answer.html'));
    assert(!html.includes('reference-intrinsics-get_random.html'));
    assert(docs.highlight('if (a < b) say("&");').includes('&lt;'));
    assert.doesNotMatch(docs.html('[`UI_add_answer`](reference.html)'),/<a[^>]*>.*<a /);
  } finally { docs.dispose(); }
});

test('includes fail clearly on cycles and missing files',()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'seven-towers-test-'));
  try {
    fs.writeFileSync(path.join(tmp,'a.md'),'{{include:b}}');
    fs.writeFileSync(path.join(tmp,'b.md'),'{{include:a}}');
    assert.throws(()=>expandIncludes('{{include:a}}',tmp),/Circular/);
    assert.throws(()=>expandIncludes('{{include:missing}}',tmp),/ENOENT/);
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
});
