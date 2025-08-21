import { LitElement, html, css } from "lit";

export class NotFoundPage extends LitElement {
  static styles = css``;

  render() {
    return html`
      <h2>404 - Page Not Found</h2>
      <p>
        <a href="/">Go back to Home</a>
      </p>
    `;
  }
}
customElements.define("not-found-page", NotFoundPage);
