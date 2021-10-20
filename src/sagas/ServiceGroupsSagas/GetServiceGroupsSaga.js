import { call, put, take, delay } from "redux-saga/effects";
import {
  getServiceGroupsSuccess,
  getServiceGroupsFailed,
} from "../../actions/ServicesGroup/GetServiceGroups.js";

import { getServiceGroupsApi } from "../../apis/ServiceGroup/GetServiceGroups";
import * as getServiceGroupsConstants from "../../constants/ServiceGroup/GetServiceGroups";

function* getServiceGroupsSaga() {
  while (true) {
    const action = yield take(getServiceGroupsConstants.GET_SERVICE_GROUPS);

    const res = yield call(getServiceGroupsApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getServiceGroupsSuccess(data));
    } else {
      yield put(getServiceGroupsFailed(data));
    }
  }
}
export const sagas = [getServiceGroupsSaga];
