import { html } from "lit";
import "../pages/home-page.js";
import "../pages/employees-page.js";
import "../pages/not-found-page.js";

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
    path: "*", // burası önemli
    render: () => html`<not-found-page></not-found-page>`,
  },
];
