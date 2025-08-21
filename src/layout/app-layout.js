import { LitElement, html, css } from "lit";
import { Router } from "@lit-labs/router";
import { routes } from "../routes/routes.js";

export class AppLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }

    app-header {
      flex-shrink: 0;
    }

    main {
      flex: 1;
      padding: 20px;
      background: var(--layout-color, #f9f9f9);
      overflow-y: auto;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      main {
        padding: 10px;
      }
    }
  `;

  router = new Router(this, routes);

  render() {
    return html`
      <app-header></app-header>
      <main>${this.router.outlet()}</main>
    `;
  }
}
customElements.define("app-layout", AppLayout);
