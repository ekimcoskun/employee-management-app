import { LitElement, html, css } from "lit";
import plusIcon from "../assets/icons/plus.svg";
import employeeIcon from "../assets/icons/employee.svg";
import turkeyFlag from "../assets/images/turkey-flag.png";
import ukFlag from "../assets/images/united-kingdom-flag.png";
import tr from "../locales/tr.js";
import en from "../locales/en.js";
import { store } from "../store/store.js";
import { setLanguage, setLocale } from "../store/slices/languageSlice.js";
import { msg } from "../store/slices/languageSlice.js";

export class AppHeader extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 24px;
      background: var(--header-color);
    }
    a {
      color: var(--primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .home a {
      color: var(--font-primary);
    }
    img {
      width: 20px;
      height: 20px;
    }
    .home {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .navigation {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .language {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .flag-icon {
      width: 30px;
      height: 20px;
      cursor: pointer;
    }
  `;
  constructor() {
    super();
    this.locale = store.getState().language.locale;
    this.language = store.getState().language.language;
    this.unsubscribe = store.subscribe(() => {
      const newLocale = store.getState().language.locale;
      if (newLocale !== this.locale) {
        this.locale = newLocale;
        this.requestUpdate();
      }
      const newLanguage = store.getState().language.language;
      if (newLanguage !== this.language) {
        this.language = newLanguage;
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe && this.unsubscribe();
  }

  changeLanguage(lang) {
    store.dispatch(setLocale(lang === "tr" ? tr : en));
    store.dispatch(setLanguage(lang));
  }

  render() {
    const flag = this.language === "tr" ? turkeyFlag : ukFlag;
    return html`
      <header>
        <div class="home">
          <a href="/">
            <img src="/ing-logo.png" alt="ING Logo" width="25" height="25" />
            ING
          </a>
        </div>
        <div class="navigation">
          <a href="/employees">
            <img src=${employeeIcon} alt="Employees" />
            ${msg("employees")}
          </a>
          <a href="/employees/new">
            <img src=${plusIcon} alt="Add New" />
            ${msg("addNew")}
          </a>
        </div>
        <div class="language">
          <img
            class="flag-icon"
            src=${flag}
            alt=${"flag"}
            @click=${() => this.changeLanguage(this.language === "tr" ? "en" : "tr")}
          />
        </div>
      </header>
    `;
  }
}
customElements.define("app-header", AppHeader);
