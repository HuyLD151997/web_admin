import * as getRequestCleaningToolHistoryConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolHistory";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY: {
      return {
        ...state,
      };
    }
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        table: data,
      };
    }
    case getRequestCleaningToolHistoryConstants.GET_REQUEST_CLEANING_TOOL_HISTORY_FAILED: {
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
