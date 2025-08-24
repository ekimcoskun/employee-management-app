import { LitElement, html, css } from "lit";

export class Button extends LitElement {
  static properties = {
    type: { type: String },
    disabled: { type: Boolean },
    variant: { type: String },
  };

  static styles = css`
    button {
      width: 100%;
      padding: 0.7rem;
      background: var(--primary-color);
      color: var(--font-primary);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 1rem;
      font-size: 1rem;
      transition: background 0.2s;
    }
    button[disabled] {
      background: #aaa;
      cursor: not-allowed;
    }
    button.primary {
      background: var(--primary-color);
      color: #fff;
    }
    button.primary:hover:not([disabled]) {
      background: var(--primary-color-dark1);
    }
    button.secondary {
      background: #ffffff;
      border: 1px solid #615fa2;
      color: #615fa2;
    }
    button.secondary:hover:not([disabled]) {
      background: #6865c4ff;
      color: #fff;
    }
    button.third {
      background: #615fa2;
      color: #fff;
    }
    button.third:hover:not([disabled]) {
      background: #37356bff;
    }
  `;

  constructor() {
    super();
    this.type = "button";
    this.disabled = false;
    this.variant = "primary";
  }

  render() {
    return html`
      <button
        class=${this.variant}
        type=${this.type}
        ?disabled=${this.disabled}
        @click=${(e) =>
          this.dispatchEvent(
            new CustomEvent("btn-click", { detail: e, bubbles: true, composed: true })
          )}
      >
        <slot></slot>
      </button>
    `;
  }
}
customElements.define("app-button", Button);
