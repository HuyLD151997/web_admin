import * as getCleaningToolConstants from "../../constants/CleaningTool/GetCleaningTool";

export const getCleaningTools = () => {
  return {
    type: getCleaningToolConstants.GET_CLEANING_TOOL,
  };
};
export const getCleaningToolsSuccess = (data) => {
  return {
    type: getCleaningToolConstants.GET_CLEANING_TOOL_SUCCESS,
    payload: {
      data,
    },
  };
};
export const getCleaningToolsFailed = (error) => {
  return {
    type: getCleaningToolConstants.GET_CLEANING_TOOL_FAILED,
    payload: {
      error,
    },
  };
};
