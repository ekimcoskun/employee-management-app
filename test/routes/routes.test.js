import { describe, it, expect } from "vitest";
import { routes } from "../../src/routes/routes.js";

import "../../src/pages/home-page.js";
import "../../src/pages/employees-page.js";
import "../../src/pages/not-found-page.js";
import "../../src/pages/create-employee-page.js";
import "../../src/pages/edit-employee-page.js";

describe("routes", () => {
  it("should have correct route paths", () => {
    const paths = routes.map((r) => r.path);
    expect(paths).toEqual(["/", "/employees", "/employees/edit/:id", "/employees/new", "*"]);
  });

  it("should render a lit template for each route", () => {
    routes.forEach((route) => {
      const result = route.path === "/employees/edit/:id" ? route.render("123") : route.render();
      expect(result.strings).toBeDefined();
    });
  });
});
