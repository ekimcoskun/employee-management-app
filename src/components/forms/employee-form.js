import { LitElement, html, css } from "lit";
import "../shared/Input/input.js";
import "../shared/Button/button.js";
import "../shared/Select/select.js";
import "../shared/DatePicker/date-picker.js";

export class EmployeeForm extends LitElement {
  static properties = {
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
    this.firstName = "";
    this.lastName = "";
    this.employmentDate = "";
    this.dateOfBirth = "";
    this.phoneNumber = "";
    this.email = "";
    this.department = "";
    this.position = "";
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
            label="First Name"
            .value=${this.firstName}
            @input-change=${(e) => this.handleInputChange("firstName", e)}
          ></app-input>

          <app-input
            label="Last Name"
            .value=${this.lastName}
            @input-change=${(e) => this.handleInputChange("lastName", e)}
          ></app-input>
          <app-datepicker
            label="Date Of Employment"
            name="employmentDate"
            .value=${this.employmentDate}
            @date-change=${(e) => this.handleInputChange("employmentDate", e)}
          ></app-datepicker>
          <app-datepicker
            label="Date Of Birth"
            name="dateOfBirth"
            .value=${this.dateOfBirth}
            @date-change=${(e) => this.handleInputChange("dateOfBirth", e)}
          ></app-datepicker>
          <app-input
            label="Email"
            .value=${this.email}
            type="email"
            @input-change=${(e) => this.handleInputChange("email", e)}
          ></app-input>
          <app-input
            label="Phone Number"
            .value=${this.phoneNumber}
            type="tel"
            @input-change=${(e) => this.handleInputChange("phoneNumber", e)}
          ></app-input>
          <app-input
            label="Department"
            .value=${this.department}
            @input-change=${(e) => this.handleInputChange("department", e)}
          ></app-input>

          <app-select
            label="Position"
            .value=${this.position}
            .options=${[
              { value: "junior", label: "Junior" },
              { value: "medior", label: "Medior" },
              { value: "senior", label: "Senior" },
            ]}
            @select-change=${(e) => this.handleInputChange("position", e)}
          ></app-select>
        </div>

        <div class="btn-group">
          <app-button type="submit" variant="primary">Save</app-button>
          <app-button type="button" variant="secondary" @btn-click=${this.handleCancel}
            >Cancel</app-button
          >
        </div>
      </form>
    `;
  }
}

customElements.define("employee-form", EmployeeForm);
