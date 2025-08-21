import { LitElement, html, css } from "lit";
import plusIcon from "../icons/plus.svg";
import employeeIcon from "../icons/employee.svg";

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
  `;

  render() {
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
            Employees
          </a>
          <a href="/employees/new">
            <img src=${plusIcon} alt="Add New" />
            Add New
          </a>
        </div>
      </header>
    `;
  }
}
customElements.define("app-header", AppHeader);
