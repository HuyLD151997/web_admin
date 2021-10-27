import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const deleteServiceApi = (data) => {
  return axiosService.delete(`${API_LINK.DELETE_SERVICE}/${data}`, token);
};
