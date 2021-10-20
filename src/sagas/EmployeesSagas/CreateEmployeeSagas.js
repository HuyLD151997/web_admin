import { call, put, take, takeEvery } from "redux-saga/effects";
import {
  createEmployeeSuccess,
  createEmployeeFailed,
} from "../../actions/Employees/CreateEmployee.js";
import { createAccountApi } from "../../apis/Employees/createAccountEmployeeApi";
import * as createAccountTypes from "../../constants/Employee/CreateEmployee";

function* createNewAccountSaga() {
  const actions = yield take(createAccountTypes.CREATE_EMPLOYEE);
  const {
    userName,
    password,
    fullname,
    gender,
    provinceId,
    districtId,
    wardId,
    address,
    latitude,
    longitude,
    phoneNumber,
    email,
  } = actions.payload;

  try {
    const res = yield call(createAccountApi, {
      userName,
      password,
      fullname,
      gender,
      provinceId,
      districtId,
      wardId,
      address,
      latitude,
      longitude,
      phoneNumber,
      email,
    });
    const { data, status } = res;
    console.log(data);
    console.log(res);
    if ((status === 200 || status === 201) && status !== 400) {
      yield put(createEmployeeSuccess(data));
      window.location.replace("/home");
    } else if (status === 400) {
      yield put(createEmployeeFailed(data));
    }
  } catch (error) {
    yield put(createEmployeeFailed(error));
  }
}
export const sagas = [createNewAccountSaga];
