import * as getRequestCleaningToolPendingConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolPending";

export const getRequestCleaningToolPending = () => {
  return {
    type: getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING,
  };
};
export const getRequestCleaningToolPendingSuccess = (data) => {
  return {
    type: getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getRequestCleaningToolPendingFailed = (error) => {
  return {
    type: getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_FAILED,
    payload: {
      error,
    },
  };
};
