import { describe, expect, it } from "vitest";
import { CPU, Opcode } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.pc).toBe(0);
    expect(cpu.memory.read(0)).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.memory.write(256, Opcode.NOP);
    cpu.memory.write(257, Opcode.NOP);

    cpu.pc = 256;

    cpu.step();
    expect(cpu.pc).toBe(257);

    cpu.step();
    expect(cpu.pc).toBe(258);
  });

  it("runs until halted", () => {
    const cpu = CPU();

    cpu.memory.write(256, Opcode.NOP);
    cpu.memory.write(257, Opcode.HALT);
    cpu.pc = 256;

    cpu.run();

    expect(cpu.pc).toBe(258);
  });

  it("inc increments A register", () => {
    const cpu = CPU();

    cpu.memory.write(0, Opcode.INC);
    cpu.memory.write(1, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(1);
  });

  it("ld into A register", () => {
    const cpu = CPU();

    cpu.memory.write(0, Opcode.LD_A);
    cpu.memory.write(1, 0x0F);
    cpu.memory.write(2, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(15);
  });

  it("ld into A register and inc", () => {
    const cpu = CPU();

    cpu.memory.write(0, Opcode.LD_A);
    cpu.memory.write(1, 0x0F);
    cpu.memory.write(2, Opcode.INC);
    cpu.memory.write(3, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(16);
  });
});
