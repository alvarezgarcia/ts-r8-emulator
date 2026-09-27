import { describe, expect, it } from "vitest";
import {
  CreateCPU,
  Opcode
} from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CreateCPU();

    expect(cpu.PC).toBe(0);
    expect(cpu.memory.readByte(0)).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CreateCPU();

    cpu.memory.writeByte(256, Opcode.NOP);
    cpu.memory.writeByte(257, Opcode.NOP);

    cpu.PC = 256;

    cpu.step();
    expect(cpu.PC).toBe(257);

    cpu.step();
    expect(cpu.PC).toBe(258);
  });

  it("runs until halted", () => {
    const cpu = CreateCPU();

    cpu.memory.writeByte(256, Opcode.NOP);
    cpu.memory.writeByte(257, Opcode.HALT);
    cpu.PC = 256;

    cpu.run();

    expect(cpu.PC).toBe(258);
  });

  it("inc increments A register", () => {
    const cpu = CreateCPU();

    cpu.memory.writeByte(0, Opcode.INC_A);
    cpu.memory.writeByte(1, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(1);
  });

  it("ld into A register", () => {
    const cpu = CreateCPU();

    cpu.memory.writeByte(0, Opcode.LD_A);
    cpu.memory.writeByte(1, 0x0F);
    cpu.memory.writeByte(2, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(15);
  });

  it("ld into A register and inc", () => {
    const cpu = CreateCPU();

    cpu.memory.writeByte(0, Opcode.LD_A);
    cpu.memory.writeByte(1, 0x0F);
    cpu.memory.writeByte(2, Opcode.INC_A);
    cpu.memory.writeByte(3, Opcode.HALT);

    cpu.run();
    expect(cpu.A).toBe(16);
  });
});
