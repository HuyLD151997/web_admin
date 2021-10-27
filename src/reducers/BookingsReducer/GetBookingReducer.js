import * as getBookingsConstants from "../../constants/Booking/GetBooking";

const initialState = {
  table: [],
  refresh: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case getBookingsConstants.GET_BOOKING: {
      return {
        ...state,
      };
    }
    case getBookingsConstants.GET_BOOKING_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        table: data,
      };
    }
    case getBookingsConstants.GET_BOOKING_FAILED: {
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
