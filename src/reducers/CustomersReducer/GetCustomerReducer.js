import * as getCustomersConstants from "../../constants/Customer/GetCustomer";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getCustomersConstants.GET_CUSTOMER: {
      return {
        ...state,
      };
    }
    case getCustomersConstants.GET_CUSTOMER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getCustomersConstants.GET_CUSTOMER_FAILED: {
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
