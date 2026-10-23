import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync, spawnSync} from 'node:child_process';
import {root} from '../build-site.mjs';

test('the site builds using only Git-tracked files',()=>{
  const temporaryRoot = fs.realpathSync(os.tmpdir());
  const checkout = fs.mkdtempSync(path.join(temporaryRoot,'exult-web-checkout-'));
  try {
    const tracked = execFileSync('git',['-c',`safe.directory=${root.replaceAll(path.sep,'/')}`,'ls-files','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
    for(const name of tracked) {
      const destination = path.resolve(checkout,name);
      assert(destination.startsWith(checkout + path.sep),'Tracked path escapes the test checkout');
      fs.mkdirSync(path.dirname(destination),{recursive:true});
      fs.copyFileSync(path.join(root,name),destination);
    }
    // Reuse installed dependencies, without copying untracked source folders or assets.
    fs.symlinkSync(path.join(root,'node_modules'),path.join(checkout,'node_modules'),process.platform === 'win32' ? 'junction' : 'dir');
    const result = spawnSync(process.execPath,['tools/build-site.mjs'],{cwd:checkout,encoding:'utf8'});
    assert.equal(result.status,0,result.error?.message || result.stderr || result.stdout);
    assert(fs.existsSync(path.join(checkout,'dist/seventowers/index.html')));
    assert(fs.existsSync(path.join(checkout,'dist/seventowers/docs/exult_intrinsics.naturaldocs.txt')));
  } finally {
    assert.equal(path.dirname(checkout),temporaryRoot,'Cleanup must remain inside the temporary directory');
    // Unlink explicitly before recursive cleanup; never descend into installed dependencies.
    const dependencies = path.join(checkout,'node_modules');
    if(fs.existsSync(dependencies)) {
      assert(fs.lstatSync(dependencies).isSymbolicLink(),'Dependencies must remain a link');
      fs.unlinkSync(dependencies);
    }
    fs.rmSync(checkout,{recursive:true,force:true});
  }
});
