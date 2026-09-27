import { Memory } from "./types";

const MEM_SIZE = 65536;

export const CreateMemory = (): Memory => {
  const memory = new Uint8Array(MEM_SIZE);

  const loadAt = (program: Uint8Array, offset: number = 0) => {
    memory.set(program, offset);
  };

  const readByte = (addr: number) => {
    return memory[addr];
  };

  const writeByte = (addr: number, value: number) => {
    memory[addr] = value;
  };

  return {
    loadAt,
    readByte,
    writeByte,
  };
};
