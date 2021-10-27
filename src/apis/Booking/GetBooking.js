import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getBookingsApi = (data) => {
  console.log(data);
  return axiosService.get(`${API_LINK.GET_BOOKING}?id=${data}`, token);
};
