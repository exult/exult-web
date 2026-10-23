import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../seventowers/preferences.js',import.meta.url),'utf8');
function page(storage) {
  const handlers = {};
  const checkbox = {checked:false,addEventListener:(event,callback)=>{handlers[event]=callback;}};
  vm.runInNewContext(source,{
    document:{getElementById:()=>checkbox},
    window:{addEventListener:(event,callback)=>{handlers[event]=callback;}},
    localStorage:storage
  });
  return {checkbox,handlers};
}

test('readable title preference persists on navigation, on return, and when disabled',()=>{
  const values = new Map();
  const storage = {getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value)};
  const first = page(storage);
  assert.equal(first.checkbox.checked,false);
  first.checkbox.checked=true;
  first.handlers.change();
  const second = page(storage);
  assert.equal(second.checkbox.checked,true);
  second.checkbox.checked=false;
  second.handlers.change();
  first.handlers.pageshow();
  assert.equal(first.checkbox.checked,false);
  assert.equal(page(storage).checkbox.checked,false);
});

test('blocked browser storage does not prevent using the title toggle',()=>{
  const blocked = ()=>{throw new Error('Storage disabled');};
  const current=page({getItem:blocked,setItem:blocked});
  current.checkbox.checked=true;
  assert.doesNotThrow(()=>current.handlers.change());
  assert.doesNotThrow(()=>current.handlers.pageshow());
  assert.equal(current.checkbox.checked,true);
});
