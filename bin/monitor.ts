import process from 'node:process';
import fs from 'node:fs';
import { Command } from 'commander';

import pj from '../package.json';
import { CreateCPU } from '../src';

const main = () => {
  const program = new Command();

  program
    .name('ts-r8-emulator monitor')
    .description('R8 CLI')
    .version(pj.version)
    .requiredOption('-r, --run <file.bin>', 'bin filepath')
    .option('-d, --debug', 'debug', false)

  program.parse(process.argv);

  const {
    run: binFilepath,
    debug
  } = program.opts();

  const binData = fs.readFileSync(binFilepath) as Uint8Array;

  const cpu = CreateCPU({ debug });
  cpu.memory.loadAt(binData);
  cpu.run();
};

main();
