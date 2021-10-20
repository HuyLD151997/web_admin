import * as getEmployeesConstants from "../../constants/Employee/GetEmployees";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getEmployeesConstants.GET_EMPLOYEES: {
      return {
        ...state,
      };
    }
    case getEmployeesConstants.GET_EMPLOYEES_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getEmployeesConstants.GET_EMPLOYEES_FAILED: {
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
