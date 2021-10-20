import * as createEmployeeConstants from "./../../constants/Employee/CreateEmployee";

export const createEmployee = (
  userName,
  password,
  fullname,
  gender,
  provinceId,
  districtId,
  wardId,
  address,
  latitude,
  longitude,
  phoneNumber,
  email
) => {
  console.log("action create account");
  return {
    type: createEmployeeConstants.CREATE_EMPLOYEE,
    payload: {
      userName,
      password,
      fullname,
      gender,
      provinceId,
      districtId,
      wardId,
      address,
      latitude,
      longitude,
      phoneNumber,
      email,
    },
  };
};

export const createEmployeeSuccess = (data) => {
  return {
    type: createEmployeeConstants.CREATE_EMPLOYEE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const createEmployeeFailed = (error) => {
  return {
    type: createEmployeeConstants.CREATE_EMPLOYEE_SUCCESS,
    payload: {
      error,
    },
  };
};
