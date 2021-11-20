import * as getRequestCleaningToolApprovedConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolApproved";

export const getRequestCleaningToolApproved = () => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED,
  };
};
export const getRequestCleaningToolApprovedSuccess = (data) => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getRequestCleaningToolApprovedFailed = (error) => {
  return {
    type: getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_FAILED,
    payload: {
      error,
    },
  };
};
