export interface Memory {
  loadAt: (program: Uint8Array, offset?: number) => void
  readByte: (addr: number) => number,
  writeByte: (addr: number, value: number) => void
};
