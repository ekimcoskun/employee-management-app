import { LitElement, html } from "lit";

export class EmployeesPage extends LitElement {
  render() {
    return html`<h2>Employees Page</h2>`;
  }
}
customElements.define("employees-page", EmployeesPage);
