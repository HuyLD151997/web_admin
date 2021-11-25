import * as getTransactionCompanyConstants from "../../constants/Transaction/GetTransactionCompany";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY: {
      return {
        ...state,
      };
    }
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getTransactionCompanyConstants.GET_TRANSACTION_COMPANY_FAILED: {
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
