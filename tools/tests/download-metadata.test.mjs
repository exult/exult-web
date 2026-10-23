import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('metadata updates cover every panel table and retain main-site table support',()=>{
  const rows=[{name:'overview'},{name:'keyring'},{name:'sifixes'},{name:'avatarpack'}];
  const collection=items=>({length:items.length,item:i=>items[i]});
  const context={
    XMLHttpRequest:class {open(){} setRequestHeader(){} send(){}},
    document:{querySelectorAll(selector){
      assert.equal(selector,'#download_links, .download-links');
      return collection(rows.map(row=>({rows:collection([row])})));
    }}
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(new URL('../../download.js',import.meta.url),'utf8'),context);
  const visited=[];
  const release={name:'Snapshot'};
  context.TryUpdateSnapshotRow=(snapshot,row)=>{
    assert.equal(snapshot,release);
    visited.push(row);
  };
  context.TryUpdateRows(release);
  assert.deepEqual(visited,rows);
});
