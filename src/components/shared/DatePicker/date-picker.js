import { LitElement, html, css } from "lit";
import datePickerIcon from "../../../assets/icons/calendar.svg";

export class Datepicker extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    name: { type: String },
    disabled: { type: Boolean },
  };

  static styles = css`
    input[type="date"]::-webkit-calendar-picker-indicator {
      opacity: 0;
      background: none;
      pointer-events: none;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--font-primary-lighter);
    }
    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }
    input[type="date"] {
      padding: 0.5rem 2.5rem 0.5rem 0.5rem;
      font-size: 1rem;
      border: 1px solid var(--font-primary-lighter);
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
    }
    input[type="date"]:disabled {
      background: #eee;
      color: #aaa;
    }
    .icon-container {
      position: absolute;
      right: 0.5rem;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 0.75rem;
      margin-left: 0.5rem;
    }
    .icon-container img {
      width: 20px;
      height: 20px;
      pointer-events: none;
      user-select: none;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.name = "";
    this.disabled = false;
  }

  handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("date-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleCalendarClick() {
    const input = this.renderRoot.querySelector("input[type='date']");
    if (input && !this.disabled) {
      input.focus();
      input.click();
    }
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.label
          ? html`<label for=${this.name}><slot name="label">${this.label}</slot></label>`
          : null}
        <div class="input-group">
          <input
            type="date"
            id=${this.name}
            name=${this.name}
            .value=${this.value}
            ?disabled=${this.disabled}
            @change=${this.handleChange}
          />
          <span class="icon-container" @click=${this.handleCalendarClick}>
            <img src=${datePickerIcon} alt="Takvim" />
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define("app-datepicker", Datepicker);
