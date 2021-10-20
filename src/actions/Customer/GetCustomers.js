import * as getCustomersConstants from "../../constants/Customer/GetCustomer";

export const getCustomers = () => {
  return {
    type: getCustomersConstants.GET_CUSTOMER,
  };
};
export const getCustomersSuccess = (data) => {
  return {
    type: getCustomersConstants.GET_CUSTOMER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getCustomersFailed = (error) => {
  return {
    type: getCustomersConstants.GET_CUSTOMER_FAILED,
    payload: {
      error,
    },
  };
};
