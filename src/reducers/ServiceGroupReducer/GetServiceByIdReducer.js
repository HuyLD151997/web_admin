import * as getServiceByIdConstants from "../../constants/ServiceGroup/GetServiceById";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getServiceByIdConstants.GET_SERVICE_BY_ID: {
      return {
        ...state,
      };
    }
    case getServiceByIdConstants.GET_SERVICE_BY_ID_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getServiceByIdConstants.GET_SERVICE_BY_ID_FAILED: {
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
