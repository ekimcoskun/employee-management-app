import { LitElement, html } from "lit";

export class HomePage extends LitElement {
  render() {
    return html`<h2>Welcome to Home Page</h2>`;
  }
}
customElements.define("home-page", HomePage);
