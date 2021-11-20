import * as getRequestCleaningToolHistoryConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolHistory";

export const getRequestCleaningToolHistory = () => {
  return {
    type: getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY,
  };
};
export const getRequestCleaningToolHistorySuccess = (data) => {
  return {
    type: getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getRequestCleaningToolHistoryFailed = (error) => {
  return {
    type: getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_FAILED,
    payload: {
      error,
    },
  };
};
