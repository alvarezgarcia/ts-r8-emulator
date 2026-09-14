import { Opcode } from './opcodes';
import { Memory } from '../memory';

type CpuOpts = {
  debug: boolean
};

export const CPU = (opts: CpuOpts) => {
  const memory = Memory();
  const regs = {
    A: 0
  };

  let halt = false;
  let pc = 0;

  const setPC = (value: number) => {
    pc = value & 0xffff;
  };

  const incrementPC = () => {
    setPC(pc + 1);
  };

  const fetchByte = () => {
    const byte = memory.read(pc);
    incrementPC();
    return byte;
  };

  const step = () => {
    opts.debug && console.log('PC', pc);
    const opcode = fetchByte();
    opts.debug && console.log('OPCODE', opcode.toString(16));
    opts.debug && console.log('***************');
    switch (opcode) {
      case Opcode.NOP:
        break;

      case Opcode.HALT:
        halt = true;
        break;

      case Opcode.INC:
        regs.A++;
        break;

      case Opcode.LD_A:
        regs.A = fetchByte();
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }
  };

  const run = () => {
    while (!halt) {
      step();
    }

    opts.debug && console.log(regs);
  };

  return {
    get pc() {
      return pc;
    },
    set pc(value: number) {
      setPC(value);
    },
    get A() {
      return regs.A;
    },
    memory,
    step,
    run,
  };
};
