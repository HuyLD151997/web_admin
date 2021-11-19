import { call, put, take, delay } from "redux-saga/effects";
import {
  getRequestCleaningToolPendingSuccess,
  getRequestCleaningToolPendingFailed,
} from "../../actions/RequestCleaningTool/GetRequestCleaningToolPending.js";

import { getRequestCleaningToolPendingApi } from "../../apis/RequestCleaningTool/GetRequestCleaningToolPendingApi";
import * as getRequestCleaningToolPendingConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolPending";

function* getEmployeesSaga() {
  while (true) {
    const action = yield take(
      getRequestCleaningToolPendingConstants.GET_REQUEST_CLEANING_TOOL_PENDING
    );

    const res = yield call(getRequestCleaningToolPendingApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getRequestCleaningToolPendingSuccess(data));
    } else {
      yield put(getRequestCleaningToolPendingFailed(data));
    }
  }
}
export const sagas = [getEmployeesSaga];
