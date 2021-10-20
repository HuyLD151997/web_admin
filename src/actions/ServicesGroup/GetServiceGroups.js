import * as getServiceGroupsConstants from "../../constants/ServiceGroup/GetServiceGroups";

export const getServiceGroups = () => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS,
  };
};
export const getServiceGroupsSuccess = (data) => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getServiceGroupsFailed = (error) => {
  return {
    type: getServiceGroupsConstants.GET_SERVICE_GROUPS_FAILED,
    payload: {
      error,
    },
  };
};
