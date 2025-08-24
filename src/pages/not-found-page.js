import { LitElement, html, css } from "lit";
import { store } from "../store/store.js";
import { msg } from "../store/slices/languageSlice.js";

export class NotFoundPage extends LitElement {
  static styles = css``;

  constructor() {
    super();
    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }
  render() {
    return html`
      <h2>${msg("notFoundPage")}</h2>
      <p>
        <a href="/">${msg("backToHome")}</a>
      </p>
    `;
  }
}
customElements.define("not-found-page", NotFoundPage);
