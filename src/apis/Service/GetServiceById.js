import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getServiceByIdApi = (data) => {
  console.log(data);
  return axiosService.get(`${API_LINK.GET_SERVICE_BY_ID}/${data}`, token);
};
