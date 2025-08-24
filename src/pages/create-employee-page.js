import { LitElement, html, css } from "lit";
import "../components/forms/employee-form.js";
import { store } from "../store/store.js";
import { msg } from "../store/slices/languageSlice.js";

export class CreateEmployeePage extends LitElement {
  constructor() {
    super();
    this.locale = store.getState().language.locale;

    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }
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

  handleCancel() {
    window.location.href = "/employees";
  }

  handleSave(e) {
    console.log("fasdfs", e.detail);
  }

  render() {
    return html`
      <div class="form-wrapper">
        <h2>${msg("addEmployee")}</h2>
        <div class="form-container">
          <employee-form @cancel=${this.handleCancel} @save=${this.handleSave}></employee-form>
        </div>
      </div>
    `;
  }
}
customElements.define("create-employee-page", CreateEmployeePage);
