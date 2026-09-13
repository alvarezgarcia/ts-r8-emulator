import process from 'node:process';
import fs from 'node:fs';
import { Command } from 'commander';

import pj from '../package.json';
import { CPU, Opcode } from './cpu';

const main = () => {
  const program = new Command();

  program
    .name('ts-r8-emulator')
    .description('R8 CLI')
    .version(pj.version)
    .requiredOption('-r, --run <file.bin>', 'bin filepath')

  program.parse(process.argv);

  const binFilepath = program.opts().run;
  const binData = fs.readFileSync(binFilepath) as Uint8Array;

  const cpu = CPU();

  cpu.memory.set(binData);
  cpu.run();

  console.log(cpu.pc);

};

main();
