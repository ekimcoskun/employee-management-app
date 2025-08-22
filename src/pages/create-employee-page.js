import { LitElement, html, css } from "lit";
import "../components/forms/employee-form.js";

export class CreateEmployeePage extends LitElement {
  static styles = css`
    .form-wrapper {
      margin: 20px;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .form-container {
      background-color: #fff;
    }
  `;
  render() {
    return html`
      <div class="form-wrapper">
        <h2>Add Employee</h2>
        <div class="form-container">
          <employee-form></employee-form>
        </div>
      </div>
    `;
  }
}
customElements.define("create-employee-page", CreateEmployeePage);
