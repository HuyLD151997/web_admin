import axiosService from "../../axios/axiosService";
import * as API_LINK from "../../constants/ApiLink";

const token = localStorage.getItem("token");

export const updateServiceGroupApi = (id, description) => {
  // console.log(description);
  return axiosService.put(
    `${API_LINK.UPDATE_SERVICE_GROUP}/${id}`,
    description,
    token
  );
};
