import { describe, it, expect } from "vitest";
import {
  employeeReducer,
  initializeEmployees,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../../src/store/slices/employeeSlice.js";

const mockEmployees = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Ayşe" },
  { id: 3, name: "Mehmet" },
];

describe("employeeSlice", () => {
  it("should initialize employees and set paginatedData", () => {
    const initialState = {
      employees: [],
      paginatedData: [],
      page: 1,
      pageSize: 2,
      totalCount: 0,
      employeeById: null,
    };
    const state = employeeReducer(initialState, initializeEmployees(mockEmployees));
    expect(state.employees).toEqual(mockEmployees);
    expect(state.totalCount).toBe(3);
    expect(state.paginatedData).toEqual([
      { id: 1, name: "Ali" },
      { id: 2, name: "Ayşe" },
    ]);
  });

  it("should get paginated employees", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 2,
      totalCount: 3,
      employeeById: null,
    };
    const state = employeeReducer(initialState, getEmployees({ page: 2, pageSize: 2 }));
    expect(state.page).toBe(2);
    expect(state.pageSize).toBe(2);
    expect(state.paginatedData).toEqual([{ id: 3, name: "Mehmet" }]);
  });

  it("should add a new employee with incremented id", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const newEmployee = { name: "Zeynep" };
    const state = employeeReducer(initialState, addEmployee(newEmployee));
    expect(state.employees.length).toBe(4);
    expect(state.employees[3]).toMatchObject({ id: 4, name: "Zeynep" });
    expect(state.totalCount).toBe(4);
  });

  it("should update an existing employee", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const updated = { id: 2, name: "Ayşe Updated" };
    const state = employeeReducer(initialState, updateEmployee(updated));
    expect(state.employees[1]).toEqual(updated);
  });

  it("should not update if employee id not found", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const updated = { id: 99, name: "Not Exist" };
    const state = employeeReducer(initialState, updateEmployee(updated));
    expect(state.employees).toEqual(mockEmployees);
  });

  it("should delete employees by id", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const state = employeeReducer(initialState, deleteEmployee([2, 3]));
    expect(state.employees).toEqual([{ id: 1, name: "Ali" }]);
    expect(state.totalCount).toBe(1);
  });

  it("should get employee by id (number)", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const state = employeeReducer(initialState, getEmployeeById({ id: 2 }));
    expect(state.employeeById).toEqual({ id: 2, name: "Ayşe" });
  });

  it("should get employee by id (string)", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const state = employeeReducer(initialState, getEmployeeById({ id: "3" }));
    expect(state.employeeById).toEqual({ id: 3, name: "Mehmet" });
  });

  it("should return null if employee by id not found", () => {
    const initialState = {
      employees: mockEmployees,
      paginatedData: [],
      page: 1,
      pageSize: 10,
      totalCount: 3,
      employeeById: null,
    };
    const state = employeeReducer(initialState, getEmployeeById({ id: 99 }));
    expect(state.employeeById).toBeNull();
  });
});
