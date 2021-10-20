import { call, put, take, delay } from "redux-saga/effects";
import {
  getCustomersSuccess,
  getCustomersFailed,
} from "../../actions/Customer/GetCustomers.js";

import { getCustomersApi } from "../../apis/Customer/GetCustomer";
import * as getCustomersConstants from "../../constants/Customer/GetCustomer";

function* getCustomersSaga() {
  while (true) {
    const action = yield take(getCustomersConstants.GET_CUSTOMER);

    const res = yield call(getCustomersApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getCustomersSuccess(data));
    } else {
      yield put(getCustomersFailed(data));
    }
  }
}
export const sagas = [getCustomersSaga];
