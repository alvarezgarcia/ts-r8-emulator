# R8 Emulator

## Intro
This repository contains the source code for [Bitfield's R8 emulator](https://bitfieldconsulting.com/posts/welcome-to-machine), implemented in TypeScript.
It is a work in progress, subject to change, and its API has not yet been fully defined.

## Setup
With at least node `20.19+` version install the dependencies:
```
$ npm i
```

## Test
```
$ npm test
```

## Invokation
This way of invoking is temporal

```
$ node_modules/.bin/tsx src/index.ts --run functional_tests/test.bin
```

To display the PC and opcode step by step, as well as the final state of the registers, add the `--debug` parameter:

```
$ node_modules/.bin/tsx src/index.ts --debug --run functional_tests/test.bin
```

`*.bin` files were compiled with [r8asm](https://github.com/bitfield/r8/tree/main)
