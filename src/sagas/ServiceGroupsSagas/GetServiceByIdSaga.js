import { call, put, take, delay } from "redux-saga/effects";
import {
  getServiceByIdSuccess,
  getServiceByIdFailed,
} from "../../actions/ServicesGroup/GetServiceById.js";

import { getServiceByIdApi } from "../../apis/Service/GetServiceById";
import * as getServiceById from "../../constants/ServiceGroup/GetServiceById";
function* getServiceByIdSaga() {
  while (true) {
    const action = yield take(getServiceById.GET_SERVICE_BY_ID);

    const res = yield call(getServiceByIdApi, action.payload);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getServiceByIdSuccess(data));
    } else {
      yield put(getServiceByIdFailed(data));
    }
  }
}
export const sagas = [getServiceByIdSaga];
