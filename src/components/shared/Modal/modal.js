import { LitElement, html, css, nothing } from "lit";
import "../Button/button.js";

export class Modal extends LitElement {
  static properties = {
    showModal: { type: Boolean, reflect: true },

    title: { type: String },
    description: { type: String },

    okButtonTitle: { type: String, attribute: "ok-button-title" },
    cancelButtonTitle: { type: String, attribute: "cancel-button-title" },

    onOk: { attribute: false },
    onCancel: { attribute: false },
  };

  static styles = css`
    /* Host artık her zaman full-screen değil; sadece açıkken overlay gibi davranacak */
    :host {
      display: block;
      pointer-events: none; /* kapalıyken tıklamalar alttaki sayfaya geçsin */
    }
    :host([showModal]) {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: auto; /* açıkken modal etkileşim alabilsin */
    }

    /* Backdrop */
    .backdrop {
      position: fixed;
      inset: 0;
      background: var(--modal-backdrop, rgba(0, 0, 0, 0.45));
      opacity: 0;
      transition: opacity 150ms ease-in-out;
      pointer-events: none;
    }
    :host([showModal]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    /* Dialog container */
    .container {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    /* Dialog panel */
    .dialog {
      box-sizing: border-box;
      min-width: min(480px, 92vw);
      max-width: min(640px, 92vw);
      max-height: 88vh;
      overflow: auto;
      background: var(--header-color);
      color: var(--modal-fg, var(--font-primary));
      box-shadow: var(--modal-shadow, 0 0 5px var(--font-primary));
      border: var(--modal-border, 1px solid var(--font-primary-lighter));
      transform: translateY(16px) scale(0.98);
      opacity: 0;
      transition: transform 180ms ease, opacity 180ms ease;
      pointer-events: auto;
      outline: none;
    }
    :host([showModal]) .dialog {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    .title {
      padding: 10px 12px 8px 24px;
      color: var(--primary-color);
    }
    .body {
      padding: 0 24px 16px 24px;
      color: var(--font-primary-lighter);
    }
    .footer {
      padding: 16px 16px;
    }

    /* Kapalıyken tüm içerik görünmesin, odak da almasın */
    :host(:not([showModal])) .container,
    :host(:not([showModal])) .backdrop {
      display: none;
    }
  `;

  constructor() {
    super();
    // Defaults
    this.showModal = false;
    this.title = "";
    this.description = "";
    this.okButtonTitle = "OK";
    this.cancelButtonTitle = "Cancel";
    this.onOk = undefined;
    this.onCancel = undefined;

    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.showModal) {
      this.lockScroll();
      this.bindGlobalKeydown();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unlockScroll();
    this.unbindGlobalKeydown();
  }

  updated(changed) {
    if (changed.has("showModal")) {
      if (this.showModal) {
        this.lockScroll();
        this.bindGlobalKeydown();

        this.updateComplete.then(() => {
          const okBtn = this.renderRoot?.getElementById("ok-btn");
          const dialog = this.renderRoot?.getElementById("dialog");
          if (okBtn) okBtn.focus();
          else if (dialog) dialog.focus();
        });
      } else {
        this.unlockScroll();
        this.unbindGlobalKeydown();
      }
    }
  }

  lockScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
  unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  onBackdropClick(e) {
    if (e.target && e.target.classList.contains("backdrop")) {
      this.handleCancel();
    }
  }

  bindGlobalKeydown() {
    window.addEventListener("keydown", this.onKeydown, true);
  }
  unbindGlobalKeydown() {
    window.removeEventListener("keydown", this.onKeydown, true);
  }

  onKeydown(e) {
    if (!this.showModal) return;

    if (e.key === "Escape") {
      e.preventDefault();
      this.handleCancel();
      return;
    }
  }

  handleOk() {
    try {
      if (typeof this.onOk === "function") this.onOk();
    } catch (e) {
      console.error("onOk callback error:", e);
    }
    this.dispatchEvent(new CustomEvent("ok", { bubbles: true, composed: true }));
  }

  handleCancel() {
    try {
      if (typeof this.onCancel === "function") this.onCancel();
    } catch (e) {
      console.error("onCancel callback error:", e);
    }
    this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div
        class="backdrop"
        @click=${this.onBackdropClick}
        aria-hidden=${this.showModal ? "false" : "true"}
      ></div>
      <div class="container" aria-hidden=${this.showModal ? "false" : "true"}>
        <section id="dialog" class="dialog" role="dialog" aria-modal="true" tabindex="-1">
          ${this.title ? html`<h2 class="title">${this.title}</h2>` : nothing}
          ${this.description ? html`<div class="body">${this.description}</div>` : nothing}
          <div class="footer">
            <app-button variant="primary" @btn-click=${() => this.handleOk()}>
              ${this.okButtonTitle || "OK"}
            </app-button>
            <app-button variant="secondary" @btn-click=${() => this.handleCancel()}>
              ${this.cancelButtonTitle || "Cancel"}
            </app-button>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define("app-modal", Modal);
