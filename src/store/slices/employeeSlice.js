import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  paginatedData: [],
  page: 1,
  pageSize: 0,
  totalCount: 0,
  employeeById: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    initializeEmployees(state, action) {
      state.employees = action.payload;
      state.totalCount = state.employees.length;
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      state.paginatedData = state.employees.slice(start, end);
    },
    getEmployees(state, action) {
      const { page, pageSize } = action.payload;
      state.page = page;
      state.pageSize = pageSize;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      state.paginatedData = state.employees.slice(start, end);
    },
    addEmployee(state, action) {
      const biggestEmployeeId = state.employees.reduce((max, emp) => Math.max(max, emp.id), 0);
      const newEmployee = {
        id: biggestEmployeeId + 1,
        ...action.payload,
      };
      state.employees.push(newEmployee);
      state.totalCount = state.employees.length;
    },
    updateEmployee(state, action) {
      const idx = state.employees.findIndex((e) => e.id === action.payload.id);
      if (idx > -1) state.employees[idx] = action.payload;
    },
    deleteEmployee(state, action) {
      const deleteIds = action.payload;
      state.employees = state.employees.filter((e) => !deleteIds.includes(e.id));
      state.totalCount = state.employees.length;
    },
    getEmployeeById(state, action) {
      const rawId = action.payload.id;
      const numId = Number(rawId);
      const idToFind = Number.isNaN(numId) ? rawId : numId;
      state.employeeById = state.employees.find((e) => e.id === idToFind) || null;
    },
  },
});

export const {
  initializeEmployees,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} = employeeSlice.actions;

export const employeeReducer = employeeSlice.reducer;
