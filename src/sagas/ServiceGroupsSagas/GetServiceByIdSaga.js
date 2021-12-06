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
    const { pageNo, pageSize, id } = action.payload;
    const res = yield call(getServiceByIdApi, id, pageNo, pageSize);
    const { data, status } = res;
    console.log(pageNo);
    console.log(pageSize);
    console.log(id);
    console.log(data);
    if (status === 200 || status === 201) {
      if (data) {
        yield localStorage.setItem("TotalPageService", data.total);
      }
      yield put(getServiceByIdSuccess(data));
    } else {
      yield put(getServiceByIdFailed(data));
    }
  }
}
export const sagas = [getServiceByIdSaga];
