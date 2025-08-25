import { it, expect, vi } from "vitest";

vi.mock("../../src/utils/formatToYYYYMMDD.js", () => ({
  toYYYYMMDD: (d) => d,
}));
vi.mock("../../src/store/store.js", () => ({
  store: { subscribe: vi.fn(), getState: () => ({ language: { locale: "tr" } }) },
}));
vi.mock("../../src/store/slices/languageSlice.js", () => ({
  msg: vi.fn((key) => key),
}));

if (!customElements.get("app-input"))
  customElements.define("app-input", class extends HTMLElement {});
if (!customElements.get("app-select"))
  customElements.define("app-select", class extends HTMLElement {});
if (!customElements.get("app-button"))
  customElements.define("app-button", class extends HTMLElement {});
if (!customElements.get("app-datepicker"))
  customElements.define("app-datepicker", class extends HTMLElement {});

import "../../src/components/forms/employee-form.js";

it("renders the form", async () => {
  document.body.innerHTML = `<employee-form></employee-form>`;
  const el = document.querySelector("employee-form");
  await new Promise((r) => setTimeout(r));
  const shadow = el.shadowRoot;
  expect(shadow.querySelector("form")).not.toBeNull();
});
