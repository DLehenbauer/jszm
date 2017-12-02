"use strict";

const JSZM=require("./jszm.js"); // version 2
const readline=require("readline");
const fs=require("fs");

const In=readline.createInterface({input: process.stdin});
const Out=process.stdout;

function run(iterator) {
  const continuation = (error, result) => {
    const current = error
      ? iterator.throw(error)
      : iterator.next(result);
    
    if (!current.done) {
      return current.value(continuation);
    }
  };
  
  return continuation();
};

const readFile = (path, options) => (done => fs.readFile(path, options, done));
const writeFile = (path, data, options) => (done => fs.writeFile(path, data, options, done));
const question = (query) => (done => In.question(query, answer => done(/* error */ null, /* result */ answer)));

run((function*() {
  const story=yield readFile(process.argv[2],{});
  const game=new JSZM(story);
  game.print=function*(x) {
    Out.write(x,"ascii");
  };
  game.read=function*() {
    return yield question("");
  };
  game.save=function*(x) {
    let n;
    let e;
    Out.write("Save? ","ascii");
    n=yield question("");
    if(!n) return false;
    try {
      yield writeFile(n,new Buffer(x.buffer),{});
      return true;
    } catch(e) {
      return false;
    }
  };
  game.restore=function*() {
    let n;
    let e;
    Out.write("Restore? ","ascii");
    n=yield question("");
    if(!n) return null;
    try {
      return new Uint8Array(yield readFile(n,{}));
    } catch(e) {
      return null;
    }
  };
  yield*game.run();
  process.exit(0);
})());