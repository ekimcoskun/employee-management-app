import { LitElement, html, css } from "lit";
import "../shared/Button/button.js";

class EmployeeCard extends LitElement {
  static properties = {
    employee: {
      firstName: { type: String },
      lastName: { type: String },
      employmentDate: { type: String },
      dateOfBirth: { type: String },
      phoneNumber: { type: String },
      email: { type: String },
      department: { type: String },
      position: { type: String },
    },

    onPrimaryButtonClick: { attribute: false },
    onSecondaryButtonClick: { attribute: false },
  };

  static styles = css`
    .card {
      background: #fff;
      border: 1px solid var(--font-primary-lighter);
      padding: 16px;
      box-sizing: border-box;
      width: 100%;
      box-shadow: 0 1px 2px var(--font-primary-lighter);
    }
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 4rem;
      row-gap: 1.5rem;
    }
    .field {
      display: flex;
      flex-direction: column;
    }
    .label {
      color: var(--font-primary-lighter);
    }
    .value {
      color: var(--font-primary);
    }
    .actions {
      margin-top: 12px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    @media (max-width: 600px) {
      .content {
        grid-template-columns: 1fr;
        column-gap: 0;
      }
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.title = "";
    this.avatar = "";
    this.primaryText = "Primary";
    this.secondaryText = "Secondary";
    this.onPrimaryButtonClick = undefined;
    this.onSecondaryButtonClick = undefined;
  }

  #handlePrimaryClick(e) {
    if (typeof this.onPrimaryButtonClick === "function") {
      this.onPrimaryButtonClick(e);
    }
    this.dispatchEvent(new CustomEvent("primary-click", { bubbles: true, composed: true }));
  }

  #handleSecondaryClick(e) {
    if (typeof this.onSecondaryButtonClick === "function") {
      this.onSecondaryButtonClick(e);
    }
    this.dispatchEvent(new CustomEvent("secondary-click", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="card">
        <div class="content">
          <div class="field">
            <span class="label">First Name:</span>
            <span class="value">${this.employee.firstName}</span>
          </div>
          <div class="field">
            <span class="label">Last Name:</span>
            <span class="value">${this.employee.lastName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${this.employee.email}</span>
          </div>
          <div class="field">
            <span class="label">Phone Number:</span>
            <span class="value">${this.employee.phoneNumber}</span>
          </div>
          <div class="field">
            <span class="label">Department:</span>
            <span class="value">${this.employee.department}</span>
          </div>
          <div class="field">
            <span class="label">Position:</span>
            <span class="value">${this.employee.position}</span>
          </div>
        </div>
        <div class="actions">
          <app-button type="button" variant="third" @click=${this.#handlePrimaryClick}
            >Edit</app-button
          >
          <app-button type="button" variant="primary" @click=${this.#handleSecondaryClick}
            >Delete</app-button
          >
        </div>
      </div>
    `;
  }
}

customElements.define("employee-card", EmployeeCard);
