import { LitElement, html } from "lit";
import { store } from "../store/store.js";
import { msg } from "../store/slices/languageSlice.js";

export class HomePage extends LitElement {
  constructor() {
    super();
    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }
  render() {
    return html`<h2>${msg("welcome")}</h2>`;
  }
}
customElements.define("home-page", HomePage);
