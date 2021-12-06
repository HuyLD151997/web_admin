import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getServiceGroupsApi = (pageIndex, pageSize) => {
  return axiosService.get(
    `${API_LINK.GET_SERVICE_GROUPS}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    token
  );
};
