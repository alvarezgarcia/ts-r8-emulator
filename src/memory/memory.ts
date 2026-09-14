const MEM_SIZE = 65536;

export const Memory = () => {
  const memory = new Uint8Array(MEM_SIZE);

  const load = (program: Uint8Array, offset: number = 0) => {
    memory.set(program, offset);
  };

  const read = (addr: number) => {
    return memory[addr];
  };

  const write = (addr: number, value: number) => {
    memory[addr] = value;
  };

  return {
    load,
    read,
    write,
  };
};
