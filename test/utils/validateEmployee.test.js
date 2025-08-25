import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/data/employees.js", () => ({
  employeeData: [{ email: "user1@example.com" }, { email: "user2@example.com" }],
}));

import { validateEmployee } from "../../src/utils/validateEmployee.js";

describe("validateEmployee", () => {
  it("should return true if the email exists", () => {
    expect(validateEmployee("user1@example.com")).toBe(true);
    expect(validateEmployee("user2@example.com")).toBe(true);
  });

  it("should return false if the email does not exist", () => {
    expect(validateEmployee("user3@example.com")).toBe(false);
  });
});
