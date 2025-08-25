import { employeeData } from "../data/employees";

export const validateEmployee = (email) => {
  return employeeData.some((e) => e.email === email);
};
