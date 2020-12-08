#!/usr/bin/env node
'use strict';
/* 
process.stdin.read()
process.stdout.write('Hello world\n')
console.log('Hello World')
console.error('Oopps!') */
printHelp();
function printHelp() {
    console.log(`File usage:
    console.js --help

    --help                          print this help
    `)
}