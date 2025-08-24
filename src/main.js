import "./layout/app-header.js";
import "./layout/app-layout.js";
import { store } from "./store/store.js";
import { initializeEmployees } from "./store/slices/employeeSlice.js";
import { employeeData } from "./data/employees";

store.dispatch(initializeEmployees(employeeData));
