import { describe, it, expect } from "vitest";
import { toYYYYMMDD } from "../../src/utils/formatToYYYYMMDD.js";

describe("toYYYYMMDD", () => {
  it("should convert DD-MM-YYYY to YYYY-MM-DD", () => {
    expect(toYYYYMMDD("13-08-1998")).toBe("1998-08-13");
    expect(toYYYYMMDD("01-12-2000")).toBe("2000-12-01");
  });

  it("should return empty string if input is falsy", () => {
    expect(toYYYYMMDD("")).toBe("");
    expect(toYYYYMMDD(null)).toBe("");
    expect(toYYYYMMDD(undefined)).toBe("");
  });

  it("should return the input as is if not in expected format", () => {
    expect(toYYYYMMDD("2025/08/25")).toBe("2025/08/25");
    expect(toYYYYMMDD("2025")).toBe("2025");
  });
});
