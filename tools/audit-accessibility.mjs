import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const mime = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.ttf':'font/ttf'};
const server = http.createServer((request, response) => {
  const file = path.resolve(dist, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
  if(!file.startsWith(dist + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end();
    return;
  }
  response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const report = [];
const artifactDirectory = path.join(root,'node_modules/.cache/accessibility');
fs.mkdirSync(artifactDirectory, {recursive:true});
let browser;
try {
  browser = await chromium.launch({channel:process.env.A11Y_BROWSER || undefined});
  const pages = process.argv.includes('--all') ? fs.readdirSync(path.join(dist,'seventowers')).filter(name=>name.endsWith('.html')).map(name=>name.slice(0,-5)) : ['index','links','news','news-archive','404','exultmods','keyring','sifixes','avatarpack',
    'usecode','tutorials','reference','highlighters','ultimaicons','reference-index',
    'reference-intrinsics-apply_damage','reference-scriptop-repeat','reference-directives-game',
    'ucc_tutorial','ucc_scripting','ucc_reference','exult_intrinsics'];
  for(const colorScheme of ['light','dark']) {
    const context = await browser.newContext({colorScheme});
    // The audit serves generated files only; remote metadata must not affect its results.
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    for(const width of [1280,390,320]) {
      await page.setViewportSize({width,height:900});
      const names = width === 1280 ? pages : ['index','keyring','usecode','ultimaicons','reference-intrinsics-apply_damage'];
      for(const name of names) {
        const response = await page.goto(`${base}/seventowers/${name}.html`);
        assert.equal(response.status(),200,name);
        await page.evaluate(() => document.fonts.ready);
        const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();
        report.push({name,colorScheme,width,violations:result.violations,incomplete:result.incomplete});
        console.log(`${colorScheme} ${width} ${name}: ${result.violations.map(v=>`${v.id} (${v.nodes.length})`).join(', ') || 'pass'}`);
        if(width < 900) {
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`${name}: page overflows at ${width}px`);
          assert(await page.locator('nav').evaluate(nav => nav.getBoundingClientRect().bottom <= document.querySelector('h1').getBoundingClientRect().top), 'Mobile navigation must precede the title');
        }
        if((width === 1280 && name === 'index') || (width === 390 && name === 'keyring')) {
          await page.screenshot({path:path.join(artifactDirectory,`${colorScheme}-${width}-${name}.png`)});
        }
        if(name === 'index' && width === 1280) {
          // axe cannot measure text filled with a gradient; check its rendered stops explicitly.
          const titleContrast = await page.locator('.title-text').evaluate(title => {
            const rgb = color => color.match(/[\d.]+/g).slice(0,3).map(Number);
            const luminance = channels => channels.map(c=>c/255).map(c=>c<=0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[0.2126,0.7152,0.0722][i],0);
            const background = luminance(rgb(getComputedStyle(title.closest('h1')).backgroundColor));
            const style = getComputedStyle(title);
            const colors = style.backgroundImage.match(/rgb\([^)]+\)/g) || [style.color];
            return Math.min(...colors.map(color => {
              const foreground = luminance(rgb(color));
              return (Math.max(foreground,background)+0.05)/(Math.min(foreground,background)+0.05);
            }));
          });
          assert(titleContrast >= 3,`Large title contrast is ${titleContrast.toFixed(2)}:1`);
          await page.keyboard.press('Tab');
          assert.equal(await page.locator(':focus').textContent(),'Skip to main content');
          await page.keyboard.press('Enter');
          assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
          for(const [state,selector] of [['hover','main a.offsite'],['focus','nav a']]) {
            const link = page.locator(selector).first();
            if(state === 'hover') await link.hover(); else await link.focus();
            const scan = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();
            report.push({name,colorScheme,width,state,violations:scan.violations,incomplete:scan.incomplete});
            console.log(`${colorScheme} ${state}: ${scan.violations.map(v=>v.id).join(', ') || 'pass'}`);
          }
          await page.locator('#readable-titles').check();
          assert.match(await page.locator('h1').evaluate(h=>getComputedStyle(h).fontFamily),/Arial/);
          await page.goto(`${base}/seventowers/news.html`);
          assert(await page.locator('#readable-titles').isChecked(),'Title preference must persist between pages');
          await page.locator('#readable-titles').uncheck();
        }
        if(name === 'keyring') {
          const choices = page.getByRole('radiogroup');
          assert.equal(await choices.getByRole('radio').count(),4);
          assert.equal(await choices.locator('.tab-panel').count(),0,'Section content must follow the complete group of choices');
          const radio = page.locator('.tab-option:checked');
          await radio.focus();
          await page.keyboard.press('ArrowRight');
          const selected = page.locator('.tab-option:checked');
          assert.equal(await selected.getAttribute('id'),'tab-sifixes');
          const panel = page.locator('#' + await selected.getAttribute('aria-controls'));
          assert(await panel.isVisible(),'Arrow keys must expose the selected section');
          assert.equal(await page.locator('.tab-panel:visible').count(),1,'Unselected panels must be hidden');
          await page.keyboard.press('Tab');
          assert(await panel.evaluate(p=>p === document.activeElement),'Selected panel must be reachable from the radio group');
        }
      }
    }
    await page.setViewportSize({width:1280,height:900});
    await page.goto(`${base}/seventowers/keyring.html`);
    const session = await context.newCDPSession(page);
    for(const type of ['protanopia','deuteranopia','tritanopia','achromatopsia']) {
      await session.send('Emulation.setEmulatedVisionDeficiency',{type});
      await page.screenshot({path:path.join(artifactDirectory,`${colorScheme}-${type}.png`)});
    }
    await session.send('Emulation.setEmulatedVisionDeficiency',{type:'none'});
    await page.emulateMedia({forcedColors:'active'});
    await page.locator('.tab-option:checked').focus();
    await page.screenshot({path:path.join(artifactDirectory,`${colorScheme}-forced-colors.png`)});
    const forced = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();
    report.push({name:'keyring',colorScheme,width:1280,state:'forced-colors',violations:forced.violations,incomplete:forced.incomplete});
    console.log(`${colorScheme} forced-colors: ${forced.violations.map(v=>v.id).join(', ') || 'pass'}`);
    await context.close();
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
const reportPath = path.join(artifactDirectory,'report.json');
fs.mkdirSync(path.dirname(reportPath), {recursive:true});
fs.writeFileSync(reportPath, JSON.stringify(report,null,2));
console.log(`Full report: ${reportPath}`);
console.log(`${report.length} scans; ${report.filter(r=>r.violations.length).length} with violations. Review gradient-text contrast checks and screenshots alongside axe's incomplete findings.`);
if(report.some(r=>r.violations.length)) process.exitCode = 1;
