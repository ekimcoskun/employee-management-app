import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/store/store.js", () => ({
  store: {
    subscribe: vi.fn(),
    getState: () => ({ language: { locale: "tr" } }),
  },
}));
vi.mock("../../src/store/slices/languageSlice.js", () => ({
  msg: vi.fn(() => "Hoş geldiniz!"),
}));

import "../../src/pages/home-page.js";

describe("HomePage", () => {
  it("renders welcome message", async () => {
    document.body.innerHTML = `<home-page></home-page>`;
    const el = document.querySelector("home-page");
    await new Promise((r) => setTimeout(r));
    const shadow = el.shadowRoot;
    expect(shadow.querySelector("h2").textContent).toBe("Hoş geldiniz!");
  });
});
