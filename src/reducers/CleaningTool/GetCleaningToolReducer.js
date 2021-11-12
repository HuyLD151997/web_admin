import * as getCleaningToolsConstants from "../../constants/CleaningTool/GetCleaningTool";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getCleaningToolsConstants.GET_CLEANING_TOOL: {
      return {
        ...state,
      };
    }
    case getCleaningToolsConstants.GET_CLEANING_TOOL_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getCleaningToolsConstants.GET_CLEANING_TOOL_FAILED: {
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
