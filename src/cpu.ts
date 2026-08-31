import { Opcode } from './opcodes';

const MEM_SIZE = 65536;

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
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
    const opcode = fetchAndAdvance();
    switch (opcode) {
      case Opcode.NOP:
        break;

      case Opcode.HALT:
        halt = true;
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
    memory,
    step,
    run
  };
};
