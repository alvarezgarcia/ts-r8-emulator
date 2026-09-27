import { Register16, Register8 } from "./types";

export const CreateRegisters = () => {
  const regs8 = new Uint8Array(Register8.A + 1);
  const regs16 = new Uint16Array(Register16.PC + 1);

  return {
    get A() {
      return regs8[Register8.A];
    },
    set A(v: number) {
      regs8[Register8.A] = v;
    },
    get PC() {
      return regs16[Register16.PC];
    },
    set PC(v: number) {
      regs16[Register16.PC] = v;
    },
  };
};
