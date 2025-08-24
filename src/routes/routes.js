import { html } from "lit";
import "../pages/home-page.js";
import "../pages/employees-page.js";
import "../pages/not-found-page.js";
import "../pages/create-employee-page.js";
import "../pages/edit-employee-page.js";

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
    path: "/employees/edit/:id",
    render: (id) => html`<edit-employee-page .employeeId=${id}></edit-employee-page>`,
  },
  {
    path: "/employees/new",
    render: () => html`<create-employee-page></create-employee-page>`,
  },
  {
    path: "*",
    render: () => html`<not-found-page></not-found-page>`,
  },
];
