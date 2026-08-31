import { Opcode } from './opcodes';

const MEM_SIZE = 65536;

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
  let halt = false;
  let pc = 0;

  const incrementPC = () => {
    pc = pc + 1 & 0xffff;
  };

  const setPC = (value: number) => {
    pc = value & 0xffff;
  };

  const getPC = () => {
    return pc;
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
    memory,
    setPC,
    getPC,
    step,
    run
  };
};
