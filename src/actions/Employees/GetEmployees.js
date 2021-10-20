import * as getEmployeesConstants from "../../constants/Employee/GetEmployees";

export const getEmployees = () => {
  return {
    type: getEmployeesConstants.GET_EMPLOYEES,
  };
};
export const getEmployeesSuccess = (data) => {
  return {
    type: getEmployeesConstants.GET_EMPLOYEES_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getEmployeesFailed = (error) => {
  return {
    type: getEmployeesConstants.GET_EMPLOYEES_FAILED,
    payload: {
      error,
    },
  };
};
