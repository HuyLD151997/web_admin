import * as getRequestCleaningToolApprovedConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolApproved";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED: {
      return {
        ...state,
      };
    }
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        table: data,
      };
    }
    case getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
