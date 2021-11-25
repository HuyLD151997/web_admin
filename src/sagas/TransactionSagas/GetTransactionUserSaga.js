import { call, put, take, delay } from "redux-saga/effects";
import {
  getTransactionUsersSuccess,
  getTransactionUsersFailed,
} from "../../actions/Transaction/GetTransactionUser.js";

import { getTransactionUsersApi } from "../../apis/Transaction/GetTransactionUser";
import * as getTransactionUsersConstants from "../../constants/Transaction/GetTransactionUser";

function* getTransactionUserSaga() {
  while (true) {
    const action = yield take(
      getTransactionUsersConstants.GET_TRANSACTION_USER
    );

    const res = yield call(getTransactionUsersApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getTransactionUsersSuccess(data));
    } else {
      yield put(getTransactionUsersFailed(data));
    }
  }
}
export const sagas = [getTransactionUserSaga];
