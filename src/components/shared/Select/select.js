import { LitElement, html, css } from "lit";

export class Select extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    options: { type: Array },
    disabled: { type: Boolean },
    error: { type: String },
  };

  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    label {
      margin-bottom: 0.5rem;
      font-weight: 400;
      color: var(--font-primary-lighter);
    }
    select {
      padding: 0.5rem;
      border: 1px solid var(--font-primary-lighter);
      border-radius: 6px;
      font-size: 1rem;
    }
    select:disabled {
      background: #eee;
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.options = [];
    this.disabled = false;
    this.error = "";
  }

  handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("select-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.label ? html`<label><slot name="label">${this.label}</slot></label>` : null}
        <select .value=${this.value} ?disabled=${this.disabled} @change=${this.handleChange}>
          ${this.options.map((opt) => html`<option value=${opt.value}>${opt.label}</option>`)}
        </select>
        ${this.error ? html`<span class="error">${this.error}</span>` : ""}
      </div>
    `;
  }
}

customElements.define("app-select", Select);
