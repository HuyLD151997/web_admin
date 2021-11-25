import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

export const getTransactionUsers = () => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER,
  };
};
export const getTransactionUsersSuccess = (data) => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getTransactionUsersFailed = (error) => {
  return {
    type: getTransactionUsersConstants.GET_TRANSACTION_USER_FAILED,
    payload: {
      error,
    },
  };
};
