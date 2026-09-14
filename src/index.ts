import process from 'node:process';
import fs from 'node:fs';
import { Command } from 'commander';

import pj from '../package.json';
import { CPU } from './cpu';

const main = () => {
  const program = new Command();

  program
    .name('ts-r8-emulator')
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

  const cpu = CPU({ debug });
  cpu.memory.load(binData);
  cpu.run();
};

main();
