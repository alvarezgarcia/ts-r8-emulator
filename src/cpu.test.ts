import { describe, expect, it } from "vitest";
import { CPU, Opcode } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.pc).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.memory[256] = Opcode.NOP;
    cpu.memory[257] = Opcode.NOP;
    cpu.pc = 256;

    cpu.step();
    expect(cpu.pc).toBe(257);

    cpu.step();
    expect(cpu.pc).toBe(258);
  });

  it("runs until halted", () => {
    const cpu = CPU();

    cpu.memory[256] = Opcode.NOP;
    cpu.memory[257] = Opcode.HALT;
    cpu.pc = 256;

    cpu.run();

    expect(cpu.pc).toBe(258);
  });
});
