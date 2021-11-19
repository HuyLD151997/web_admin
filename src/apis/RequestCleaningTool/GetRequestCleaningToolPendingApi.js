import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getRequestCleaningToolPendingApi = () => {
  return axiosService.get(API_LINK.REQUEST_CLEANING_TOOL_PENDING, token);
};
