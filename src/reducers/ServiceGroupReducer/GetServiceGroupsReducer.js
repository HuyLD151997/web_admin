import * as getServiceGroupsConstants from "../../constants/ServiceGroup/GetServiceGroups";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getServiceGroupsConstants.GET_SERVICE_GROUPS: {
      return {
        ...state,
      };
    }
    case getServiceGroupsConstants.GET_SERVICE_GROUPS_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getServiceGroupsConstants.GET_SERVICE_GROUPS_FAILED: {
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
