import { LitElement, html, css } from "lit";

export class AppInput extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    type: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.type = "text";
  }

  static styles = css`
    .input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    label {
      font-weight: 400;
      margin-bottom: 0.5rem;
      color: var(--font-primary-lighter);
    }

    input {
      padding: 0.6rem;
      border: 1px solid var(--font-primary-lighter);
      border-radius: 6px;
      font-size: 1rem;
    }
  `;

  handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="input-group">
        <label>${this.label}</label>
        <input type=${this.type} .value=${this.value} @input=${this.handleInput} />
      </div>
    `;
  }
}

customElements.define("app-input", AppInput);
