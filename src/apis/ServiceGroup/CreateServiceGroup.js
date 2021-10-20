import axiosService from "./../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const createServiceGroupApi = (data) => {
  return axiosService.post(API_LINK.CREATE_SERVICE_GROUPS, data, token);
};
