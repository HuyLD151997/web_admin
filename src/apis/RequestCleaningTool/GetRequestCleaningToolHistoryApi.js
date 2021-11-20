import axiosService from "../../axios/axiosService";
import * as API_LINK from "./../../constants/ApiLink";
const token = localStorage.getItem("token");
export const getRequestCleaningToolHistoryApi = () => {
  return axiosService.get(API_LINK.REQUEST_CLEANING_TOOL_HISTORY, token);
};
