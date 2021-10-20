import * as createEmployeeConstants from "./../../constants/Employee/CreateEmployee";
import swal from "sweetalert2";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case createEmployeeConstants.CREATE_EMPLOYEE: {
      return {
        ...state,
      };
    }
    case createEmployeeConstants.CREATE_EMPLOYEE_SUCCESS: {
      const { data } = action.payload;
      swal.fire({
        icon: "success",
        text: "Tạo tài khoản thành công !",
        timer: 5000,
        showConfirmButton: false,
      });
      return {
        ...state,
      };
    }
    case createEmployeeConstants.CREATE_EMPLOYEE_FAILED: {
      const { data } = action.payload;
      swal.fire({
        icon: "error",
        text: "Tạo tài khoản không thành công",
        showConfirmButton: false,
      });
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
