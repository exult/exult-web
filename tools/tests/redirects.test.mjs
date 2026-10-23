import {test} from 'node:test';
import assert from 'node:assert/strict';
import {legacyRedirects} from '../legacy-redirects.mjs';
import {staticUrl} from '../build-site.mjs';

test('Apache route conditions agree with the static link mapper',()=>{
  const config=legacyRedirects({intrinsics:['resurrect'],scriptop:['resurrect'],directives:['line'],reference:['intrinsic_reference']});
  function redirect(url) {
    const [file,query='']=url.split('?');
    let conditions=[];
    for(const line of config.split('\n')) {
      if(line.startsWith('RewriteCond')) conditions.push(new RegExp(line.split(' ')[2],'i'));
      if(line.startsWith('RewriteRule')) {
        const [,pattern,target]=line.split(' ');
        if(new RegExp(pattern).test(file) && conditions.every(c=>c.test(query))) return target;
        conditions=[];
      }
    }
  }
  for(const url of ['index.php','news.php','news.php?showall=1','downloads.php','downloads.php?section=1','downloads.php?page=2&section=1','code.php','code.php?OUTPUT=text','code.php?OUTPUT=naturaldocs&DATAFILE=ucc_scripting.dat','ucc_ref.php?TYPE=6','ucc_ref.php?TYPE=6&DATAFILE=%23line','ucc_ref.php?DATAFILE=UI_resurrect','ucc_ref.php?DATAFILE=resurrect&TYPE=3','ucc_ref.php?TYPE=50&DATAFILE=intrinsic_reference']) assert.equal(redirect(url),staticUrl(url),url);
});
