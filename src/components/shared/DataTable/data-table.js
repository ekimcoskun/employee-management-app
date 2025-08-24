import { LitElement, html, css } from "lit";
import deleteIcon from "../../../assets/icons/delete.svg";
import editIcon from "../../../assets/icons/edit.svg";

export class DataTable extends LitElement {
  static properties = {
    data: { type: Array },
    selectedRows: { type: Array },
    page: { type: Number },
    rowsPerPage: { type: Number },
    totalCount: { type: Number },
    loading: { type: Boolean },
    onSelectedRowsChange: { type: Function },
    onEditRow: { type: Function },
    onDeleteRow: { type: Function },
  };

  static styles = css`
    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;
    }
    thead tr {
      background: #fff;
    }
    th,
    td {
      text-align: left;
      padding: 1rem 0.75rem;
      font-size: 0.98rem;
      color: #333;
      font-weight: 400;
    }
    th {
      color: var(--primary-color);
      font-weight: 500;
      border-bottom: 2px solid #f2f2f2;
      background: #fff;
      font-size: 1rem;
    }
    tr {
      border-bottom: 1px solid #f2f2f2;
      background: #fff;
    }
    tr:last-child {
      border-bottom: none;
    }
    td.actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .action-btn {
      border: none;
      background: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-color);
    }
    .action-btn:hover {
      background: #fff2e6;
      border-radius: 50%;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: var(--primary-color);
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this.selectedRows = [];
    this.page = 1;
    this.rowsPerPage = 8;
    this.totalCount = 1;
    this.onEditRow = undefined;
    this.onDeleteRow = undefined;
    this.onSelectedRowsChange = undefined;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalCount / this.rowsPerPage));
  }

  handleDelete(id) {
    this.dispatchEvent(new CustomEvent("row-deleted", { detail: id }));
  }

  handleEdit(id) {
    this.dispatchEvent(new CustomEvent("row-edited", { detail: id }));
  }

  updateSelectedRows(newSelectedRows) {
    this.selectedRows = [...newSelectedRows];
    if (typeof this.onSelectedRowsChange === "function") {
      this.onSelectedRowsChange(this.selectedRows);
    }
    this.dispatchEvent(new CustomEvent("selected-rows-change", { detail: this.selectedRows }));
  }

  toggleRow(idx) {
    console.log("data", this.data);

    const realIdx = (this.page - 1) * this.rowsPerPage + idx;
    if (this.selectedRows.includes(realIdx)) {
      this.selectedRows = this.selectedRows.filter((i) => i !== realIdx);
      console.log("selectedRows", this.selectedRows);
      this.updateSelectedRows(this.selectedRows);
    } else {
      this.selectedRows = [...this.selectedRows, realIdx];
      this.updateSelectedRows(this.selectedRows);
    }
  }

  toggleAllRows(e) {
    if (e.target.checked) {
      const start = (this.page - 1) * this.rowsPerPage;
      this.selectedRows = [
        ...this.selectedRows,
        ...Array.from({ length: this.data.length }, (_, i) => start + i),
      ];
      this.updateSelectedRows(this.selectedRows);
    } else {
      const start = (this.page - 1) * this.rowsPerPage;
      this.selectedRows = this.selectedRows.filter(
        (i) => i < start || i >= start + this.rowsPerPage
      );
      this.updateSelectedRows(this.selectedRows);
    }
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change=${this.toggleAllRows}
                .checked=${this.data.length > 0 &&
                this.data.every((_, i) =>
                  this.selectedRows.includes((this.page - 1) * this.rowsPerPage + i)
                )}
                ?disabled=${this.loading}
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.loading
            ? html`<tr>
                <td colspan="10" class="loading-indicator">Yükleniyor...</td>
              </tr>`
            : this.data.map(
                (row, idx) => html`
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        .checked=${this.selectedRows.includes(
                          (this.page - 1) * this.rowsPerPage + idx
                        )}
                        @change=${() => this.toggleRow(idx)}
                        ?disabled=${this.loading}
                      />
                    </td>
                    <td>${row.firstName}</td>
                    <td>${row.lastName}</td>
                    <td>${row.employmentDate}</td>
                    <td>${row.dateOfBirth}</td>
                    <td>${row.phoneNumber}</td>
                    <td>${row.email}</td>
                    <td>${row.department}</td>
                    <td>${row.position}</td>
                    <td class="actions">
                      <button class="action-btn" @click=${() => this.handleEdit(row.id)}>
                        <img src=${editIcon} width="16" height="16" alt="Edit" />
                      </button>
                      <button class="action-btn" @click=${() => this.handleDelete(row.id)}>
                        <img src=${deleteIcon} width="16" height="16" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                `
              )}
        </tbody>
      </table>
    `;
  }
}

customElements.define("app-data-table", DataTable);
