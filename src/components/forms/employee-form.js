import { LitElement, html, css } from "lit";
import "../shared/Input/input.js";
import "../shared/Button/button.js";
import "../shared/Select/select.js";
import "../shared/DatePicker/date-picker.js";
import { toYYYYMMDD } from "../../utils/formatToYYYYMMDD.js";
import { store } from "../../store/store.js";
import { msg } from "../../store/slices/languageSlice.js";

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    firstName: { type: String },
    lastName: { type: String },
    employmentDate: { type: String },
    dateOfBirth: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    department: { type: String },
    position: { type: String },
  };

  constructor() {
    super();
    this.employee = null;
    this.firstName = "";
    this.lastName = "";
    this.employmentDate = "";
    this.dateOfBirth = "";
    this.phoneNumber = "";
    this.email = "";
    this.department = "";
    this.position = "";

    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }

  updated(changedProps) {
    if (changedProps.has("employee")) {
      if (this.employee) {
        this.prefillFromEmployee(this.employee);
      } else {
        this.resetForm();
      }
    }
  }

  prefillFromEmployee(emp) {
    this.id = emp.id ?? emp.id ?? undefined;
    this.firstName = emp.firstName ?? "";
    this.lastName = emp.lastName ?? "";
    this.employmentDate = toYYYYMMDD(emp.employmentDate) ?? "";
    this.dateOfBirth = toYYYYMMDD(emp.dateOfBirth) ?? "";
    this.phoneNumber = emp.phoneNumber ?? "";
    this.email = emp.email ?? "";
    this.department = emp.department ?? "";
    this.position = emp.position ?? "";
  }

  resetForm() {
    this.id = undefined;
    this.firstName = "";
    this.lastName = "";
    this.employmentDate = "";
    this.dateOfBirth = "";
    this.phoneNumber = "";
    this.email = "";
    this.department = "";
    this.position = "";
  }

  handleInputChange(field, e) {
    this[field] = e.detail.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const employeeData = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      employmentDate: this.employmentDate,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      email: this.email,
      department: this.department,
      position: this.position,
    };

    this.dispatchEvent(
      new CustomEvent("employee-added", {
        detail: employeeData,
        bubbles: true,
        composed: true,
      })
    );
    this.resetForm();
  }

  handleCancel() {
    this.resetForm();
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  static styles = css`
    .form-fields {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 600px) {
      .form-fields {
        grid-template-columns: 1fr 1fr;
      }
      form {
        padding: 5rem;
      }
    }
    @media (min-width: 1100px) {
      .form-fields {
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 2rem;
        column-gap: 12rem;
      }
    }
    .btn-group {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    .btn-group app-button {
      width: 20rem;
    }
  `;

  handleInputChange(field, e) {
    this[field] = e.detail.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const employeeData = {
      firstName: this.firstName,
      lastName: this.lastName,
      employmentDate: this.employmentDate,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      email: this.email,
      department: this.department,
      position: this.position,
    };

    this.dispatchEvent(
      new CustomEvent("employee-added", {
        detail: employeeData,
        bubbles: true,
        composed: true,
      })
    );

    this.firstName = "";
    this.lastName = "";
    this.employmentDate = "";
    this.dateOfBirth = "";
    this.phoneNumber = "";
    this.email = "";
    this.department = "";
    this.position = "";
  }

  handleCancel() {
    this.firstName = "";
    this.lastName = "";
    this.employmentDate = "";
    this.dateOfBirth = "";
    this.phoneNumber = "";
    this.email = "";
    this.department = "";
    this.position = "";

    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="form-fields">
          <app-input
            label="${msg("firstName")}"
            .value=${this.firstName}
            @input-change=${(e) => this.handleInputChange("firstName", e)}
          ></app-input>

          <app-input
            label="${msg("lastName")}"
            .value=${this.lastName}
            @input-change=${(e) => this.handleInputChange("lastName", e)}
          ></app-input>
          <app-datepicker
            label="${msg("dateOfEmployment")}"
            name="employmentDate"
            .value=${this.employmentDate}
            @date-change=${(e) => this.handleInputChange("employmentDate", e)}
          ></app-datepicker>
          <app-datepicker
            label="${msg("dateOfBirth")}"
            name="dateOfBirth"
            .value=${this.dateOfBirth}
            @date-change=${(e) => this.handleInputChange("dateOfBirth", e)}
          ></app-datepicker>
          <app-input
            label="${msg("email")}"
            .value=${this.email}
            type="email"
            @input-change=${(e) => this.handleInputChange("email", e)}
          ></app-input>
          <app-input
            label="${msg("phoneNumber")}"
            .value=${this.phoneNumber}
            type="tel"
            @input-change=${(e) => this.handleInputChange("phoneNumber", e)}
          ></app-input>
          <app-input
            label="${msg("department")}"
            .value=${this.department}
            @input-change=${(e) => this.handleInputChange("department", e)}
          ></app-input>

          <app-select
            label="${msg("position")}"
            .value=${this.position}
            .options=${[
              { value: "Junior", label: "Junior" },
              { value: "Medior", label: "Medior" },
              { value: "Senior", label: "Senior" },
            ]}
            @select-change=${(e) => this.handleInputChange("position", e)}
          ></app-select>
        </div>

        <div class="btn-group">
          <app-button type="submit" variant="primary">${msg("save")}</app-button>
          <app-button type="button" variant="secondary" @btn-click=${this.handleCancel}
            >${msg("cancel")}</app-button
          >
        </div>
      </form>
    `;
  }
}

customElements.define("employee-form", EmployeeForm);
