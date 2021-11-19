import * as getRequestCleaningToolPendingConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolPending";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING: {
      return {
        ...state,
      };
    }
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_SUCCESS: {
      const { data } = action.payload;
      console.log(data);
      return {
        ...state,
        table: data,
      };
    }
    case getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING_FAILED: {
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
