import { LitElement, html, css } from "lit";
import "../components/shared/DataTable/data-table.js";
import "../components/shared/DataTable/pagination.js";
import "../components/cards/employee-card.js";
import "../components/shared/Modal/modal.js";
import { store } from "../store/store.js";
import { getEmployees, deleteEmployee } from "../store/slices/employeeSlice.js";
import listIcon from "../assets/icons/list.svg";
import cardsIcon from "../assets/icons/cards.svg";
import { msg } from "../store/slices/languageSlice.js";

export class EmployeesPage extends LitElement {
  static styles = css`
    .page-wrapper {
      margin: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .list-type-icons {
      display: flex;
      gap: 1rem;
      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: transform 0.2s;
      }
      img:hover {
        transform: scale(1.1);
      }
    }
    @media (min-width: 900px) {
      .employee-cards {
        padding: 0 5rem;
      }
    }
    .employee-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 10rem;
      row-gap: 2rem;
    }
  `;
  static properties = {
    listType: { type: String },
    employees: { type: Array },
    page: { type: Number },
    totalCount: { type: Number },
    selectedRows: { type: Array },
    showCancelModal: { type: Boolean },
  };

  constructor() {
    super();
    this.listType = "table";
    this.employees = [];
    this.page = 1;
    this.pageSize = 10;
    this.totalCount = 1;
    this.selectedRows = [];
    this.showCancelModal = false;

    store.subscribe(() => {
      this.locale = store.getState().language.locale;
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.employees = store.getState().employee.paginatedData;
      this.page = store.getState().employee.page;
      this.totalCount = store.getState().employee.totalCount;
      this.requestUpdate();
    });
    store.dispatch(getEmployees({ page: this.page, pageSize: this.pageSize }));
    this.totalCount = store.getState().employee.totalCount;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
  }

  handlePageChange(e) {
    this.page = e.detail;
    store.dispatch(getEmployees({ page: this.page, pageSize: this.pageSize }));
    this.selectedRows = [];
  }

  handleDeleteRow(row) {
    if (this.selectedRows.length === 0) {
      this.selectedRows = [row];
    }
    this.showCancelModal = true;
  }

  handleEditRow(row) {
    window.location.href = `/employees/edit/${row.id}`;
  }

  approveDeleteEmployee(e) {
    store.dispatch(deleteEmployee(e.detail.id));
    store.dispatch(getEmployees({ page: this.page, pageSize: this.pageSize }));
  }

  handleSelectedRowsChange(e) {
    this.selectedRows = e;
  }

  handleListTypeChange(type) {
    this.listType = type;
    this.pageSize = type === "cards" ? 4 : 10;
    this.page = 1;
    this.selectedRows = [];
    store.dispatch(getEmployees({ page: this.page, pageSize: this.pageSize }));
  }

  createDescriptionTextById(selectedRows) {
    console.log("Selected rows:", selectedRows);
    if (selectedRows.length > 1) {
      return `${selectedRows.length} ${msg("deleteDescription")}`;
    }
    const employee = this.employees.find((emp) => emp.id === selectedRows[0]?.id);
    return employee
      ? `${employee.firstName} ${employee.lastName} ${msg("deleteDescription")}`
      : msg("noEmployeesSelected");
  }

  render() {
    return html`
      <app-modal
        .showModal=${this.showCancelModal}
        title=${msg("areYouSure")}
        description=${this.createDescriptionTextById(this.selectedRows)}
        ok-button-title=${msg("proceed")}
        cancel-button-title=${msg("cancel")}
        .onOk=${() => console.log("OK")}
        .onCancel=${() => (this.showCancelModal = false)}
      ></app-modal>
      <div class="page-wrapper">
        <div class="header">
          <h2>${msg("employeeList")}</h2>
          <div class="list-type-icons">
            <img
              src=${listIcon}
              alt="List View"
              @click=${() => this.handleListTypeChange("table")}
            />
            <img
              src=${cardsIcon}
              alt="Card View"
              @click=${() => this.handleListTypeChange("cards")}
            />
          </div>
        </div>

        ${this.listType === "cards"
          ? html`
              <div class="employee-cards">
                ${this.employees.map(
                  (employee) => html`<employee-card .employee=${employee}></employee-card>`
                )}
              </div>
            `
          : html`
              <div class="data-table-container">
                <app-data-table
                  .data=${this.employees}
                  .selectedRows=${this.selectedRows}
                  @row-deleted=${(e) => this.handleDeleteRow(e.detail)}
                  @row-edited=${(e) => this.handleEditRow(e.detail)}
                  @selected-rows-change=${(e) => this.handleSelectedRowsChange(e.detail)}
                ></app-data-table>
              </div>
            `}

        <app-pagination
          .page=${this.page}
          .rowsPerPage=${this.pageSize}
          .totalCount=${this.totalCount}
          @page-change=${this.handlePageChange}
        ></app-pagination>
      </div>
    `;
  }
}
customElements.define("employees-page", EmployeesPage);
