import { it, expect, vi } from "vitest";

vi.mock("@lit-labs/router", () => ({
  Router: vi.fn(function () {
    this.outlet = vi.fn(() => "ROUTER_OUTLET");
  }),
}));

vi.mock("../../src/routes/routes.js", () => ({
  routes: [{ path: "/", render: () => "Home" }],
}));

if (!customElements.get("app-header")) {
  customElements.define("app-header", class extends HTMLElement {});
}

import "../../src/layout/app-layout.js";

it("renders app-header and main with router outlet", async () => {
  document.body.innerHTML = `<app-layout></app-layout>`;
  const el = document.querySelector("app-layout");
  await el.updateComplete;
  const shadow = el.shadowRoot;
  expect(shadow.querySelector("app-header")).not.toBeNull();
  expect(shadow.querySelector("main").innerHTML).toContain("ROUTER_OUTLET");
});
