import { Opcode } from './opcodes';

const MEM_SIZE = 65536;

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
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

  const fetchAndAdvance = () => {
    const opcode = memory[pc];
    incrementPC();
    return opcode;
  };

  const step = () => {
    console.log('PC', pc);
    const opcode = fetchAndAdvance();
    console.log('OPCODE', opcode);
    console.log('***************');
    switch (opcode) {
      case Opcode.NOP:
        break;

      case Opcode.HALT:
        halt = true;
        break;

      case Opcode.INC:
        regs.A++;
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }
  };

  const run = () => {
    while (!halt) {
      step();
    }
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
