import { call, put, take, delay } from "redux-saga/effects";
import {
  getCleaningToolsSuccess,
  getCleaningToolsFailed,
} from "../../actions/CleaningTool/GetCleaningTool.js";

import { getCleaningToolApi } from "../../apis/CleaningTool/GetCleaningTool";
import * as getCleaningToolConstants from "../../constants/CleaningTool/GetCleaningTool";

function* getCleaningToolSaga() {
  while (true) {
    const action = yield take(getCleaningToolConstants.GET_CLEANING_TOOL);

    const res = yield call(getCleaningToolApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getCleaningToolsSuccess(data));
    } else {
      yield put(getCleaningToolsFailed(data));
    }
  }
}
export const sagas = [getCleaningToolSaga];
