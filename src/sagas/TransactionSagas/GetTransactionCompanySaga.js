import { call, put, take, delay } from "redux-saga/effects";
import {
  getTransactionCompanySuccess,
  getTransactionCompanyFailed,
} from "../../actions/Transaction/GetTransactionCompany.js";

import { getTransactionCompanyApi } from "../../apis/Transaction/GetTransactionCompany";
import * as getTransactionCompanyConstants from "../../constants/Transaction/GetTransactionCompany";

function* getTransactionCompanySaga() {
  while (true) {
    const action = yield take(
      getTransactionCompanyConstants.GET_TRANSACTION_COMPANY
    );

    const res = yield call(getTransactionCompanyApi);
    const { data, status } = res;
    if (status === 200 || status === 201) {
      yield put(getTransactionCompanySuccess(data));
    } else {
      yield put(getTransactionCompanyFailed(data));
    }
  }
}
export const sagas = [getTransactionCompanySaga];
