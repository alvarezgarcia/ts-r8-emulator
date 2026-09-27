import { Opcode } from './opcodes';
import { CreateMemory } from '../memory';
import { CreateRegisters } from './registers';

import { CpuOpts } from './types';
import { toHex16, toHex8 } from '../utils';

export const CreateCPU = (
  opts: CpuOpts = {
    debug: false
  }
) => {
  const memory = CreateMemory();
  const regs = CreateRegisters();

  const fetchByte = () => {
    const byte = memory.readByte(regs.PC);
    regs.PC++;
    return byte;
  };

  const step = () => {
    const opcode = fetchByte();
    opts.debug && console.log(`| OpCode: ${toHex8(opcode)} | PC: ${toHex16(regs.PC)} | A: ${toHex8(regs.A)} |`);
    switch (opcode) {
      case Opcode.NOP:
        break;

      case Opcode.HALT:
        return false;

      case Opcode.INC_A:
        regs.A++;
        break;

      case Opcode.LD_A:
        regs.A = fetchByte();
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }


    return true;
  };

  const run = () => {
    while (step()) {}

    opts.debug && console.log(`| PC: ${toHex16(regs.PC)} | A: ${toHex8(regs.A)} |`);
  };

  return {
    get PC() { return regs.PC; },
    set PC(v: number) { regs.PC = v; },
    get A() { return regs.A; },
    memory,
    step,
    run,
  };
};
