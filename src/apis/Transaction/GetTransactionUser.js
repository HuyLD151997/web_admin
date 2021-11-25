import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getTransactionUsersApi = () => {
  return axiosService.get(API_LINK.GET_TRANSACTION_USER, token);
};
