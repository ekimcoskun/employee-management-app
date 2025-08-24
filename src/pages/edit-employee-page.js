import { LitElement, html, css } from "lit";
import { getEmployeeById } from "../store/slices/employeeSlice.js";
import "../components/forms/employee-form.js";
import { store } from "../store/store.js";
import { msg } from "../store/slices/languageSlice.js";

export class EditEmployeePage extends LitElement {
  static styles = css`
    .page-wrapper {
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

  static properties = {
    employeeId: { type: String },
    employee: { state: true },
  };

  constructor() {
    super();
    this.employeeId = "";
    this.employee = null;
    this.unsubscribe = null;

    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.employee = state.employee?.employeeById ?? null;
    });

    if (this.employeeId) {
      this.fetchEmployee(this.employeeId);
    }

    const s = store.getState();
    this.employee = s.employee?.employeeById ?? null;
  }

  disconnectedCallback() {
    if (typeof this.unsubscribe === "function") this.unsubscribe();
    super.disconnectedCallback();
  }

  updated(changedProps) {
    if (changedProps.has("employeeId")) {
      this.fetchEmployee(this.employeeId);
    }
  }

  fetchEmployee(id) {
    if (!id) return;
    const asNumber = Number(id);
    const lookupId = Number.isNaN(asNumber) ? id : asNumber;
    store.dispatch(getEmployeeById(lookupId));
  }

  handleCancel() {
    window.location.href = "/employees";
  }

  render() {
    return html`
      <div class="page-wrapper">
        <h2>${msg("editEmployee")}</h2>
        <div class="form-container">
          ${this.employee
            ? html`<employee-form
                .employee=${this.employee}
                @cancel=${this.handleCancel}
                @save=${this.handleSave}
              ></employee-form>`
            : html`<p>${msg("employeeNotFound")}</p>`}
        </div>
      </div>
    `;
  }
}

customElements.define("edit-employee-page", EditEmployeePage);
