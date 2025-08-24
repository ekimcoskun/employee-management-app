import { LitElement, html, css } from "lit";

export class Pagination extends LitElement {
  static properties = {
    data: { type: Array },
    selectedRows: { type: Array },
    page: { type: Number },
    rowsPerPage: { type: Number },
    totalCount: { type: Number },
    onPageChange: { type: Function },
    loading: { type: Boolean },
    onSelectedRowsChange: { type: Function },
  };

  static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2rem 0 0 0;
      gap: 0.5rem;
      font-size: 1rem;
    }
    .pagination-btn {
      border: none;
      background: none;
      color: var(--primary-color);
      font-size: 1.3rem;
      cursor: pointer;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pagination-btn.active {
      background: var(--primary-color);
      color: #fff;
      font-weight: bold;
    }
    .pagination-btn:not(.active):hover {
      background: #fff2e6;
    }
  `;

  constructor() {
    super();
    this.page = 1;
    this.rowsPerPage = 8;
    this.totalCount = 1;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalCount / this.rowsPerPage));
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.dispatchEvent(new CustomEvent("page-change", { detail: page }));
  }

  render() {
    return html`
      <div class="pagination">
        <button
          class="pagination-btn"
          @click=${() => this.goToPage(this.page - 1)}
          ?disabled=${this.page === 1 || this.loading}
        >
          <span style="font-size:1.3rem;">&#60;</span>
        </button>
        ${this.page > 2 ? html`<span>...</span>` : ""}
        ${[this.page - 1, this.page, this.page + 1]
          .filter((p) => p >= 1 && p <= this.totalPages)
          .map(
            (p) => html`
              <button
                class="pagination-btn ${this.page === p ? "active" : ""}"
                @click=${() => this.goToPage(p)}
                ?disabled=${this.loading}
              >
                ${p}
              </button>
            `
          )}
        ${this.page < this.totalPages - 1 ? html`<span>...</span>` : ""}
        <button
          class="pagination-btn"
          @click=${() => this.goToPage(this.page + 1)}
          ?disabled=${this.page === this.totalPages || this.loading}
        >
          <span style="font-size:1.3rem;">&#62;</span>
        </button>
      </div>
    `;
  }
}

customElements.define("app-pagination", Pagination);
