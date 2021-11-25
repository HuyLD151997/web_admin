import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getTransactionUsersConstants.GET_TRANSACTION_USER: {
      return {
        ...state,
      };
    }
    case getTransactionUsersConstants.GET_TRANSACTION_USER_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getTransactionUsersConstants.GET_TRANSACTION_USER_FAILED: {
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
