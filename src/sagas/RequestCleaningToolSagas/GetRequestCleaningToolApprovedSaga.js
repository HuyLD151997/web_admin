import { call, put, take, delay } from "redux-saga/effects";
import {
  getRequestCleaningToolApprovedSuccess,
  getRequestCleaningToolApprovedFailed,
} from "../../actions/RequestCleaningTool/GetRequestCleaningToolApproved.js";

import { getRequestCleaningToolApprovedApi } from "../../apis/RequestCleaningTool/GetRequestCleaningToolApprovedApi";
import * as getRequestCleaningToolApprovedConstants from "../../constants/RequestCleaningTool/GetRequestCleaningToolApproved";

function* getRequestCleaningToolApprovedSaga() {
  while (true) {
    const action = yield take(
      getRequestCleaningToolApprovedConstants.GET_REQUEST_CLEANING_TOOL_APPROVED
    );

    const res = yield call(getRequestCleaningToolApprovedApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getRequestCleaningToolApprovedSuccess(data));
    } else {
      yield put(getRequestCleaningToolApprovedFailed(data));
    }
  }
}
export const sagas = [getRequestCleaningToolApprovedSaga];
