import { html } from "lit";
import "../pages/home-page.js";
import "../pages/employees-page.js";
import "../pages/not-found-page.js";
import "../pages/create-employee-page.js";

export const routes = [
  {
    path: "/",
    render: () => html`<home-page></home-page>`,
  },
  {
    path: "/employees",
    render: () => html`<employees-page></employees-page>`,
  },
  {
    path: "/employees/new",
    render: () => html`<create-employee-page></create-employee-page>`,
  },
  {
    path: "*", // burası önemli
    render: () => html`<not-found-page></not-found-page>`,
  },
];
