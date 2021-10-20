import { fork, all } from "redux-saga/effects";
import { sagas as authenticateSagas } from "./authentication/authentication";
import { sagas as getEmployeesSagas } from "./EmployeesSagas/GetEmployeesSaga";
import { sagas as getProvincesSagas } from "./EmployeesSagas/GetProvincesSagas";
import { sagas as getWardsAndDistricsSaga } from "./EmployeesSagas/GetWardAndDistricSagas";
import { sagas as getEmployByIdSaga } from "./EmployeesSagas/GetEmployByIdSaga";
import { sagas as createEmployeeSaga } from "./EmployeesSagas/CreateEmployeeSagas";

const allSaga = [
  ...authenticateSagas,
  ...getEmployeesSagas,
  ...getProvincesSagas,
  ...getWardsAndDistricsSaga,
  ...getEmployByIdSaga,
  ...createEmployeeSaga,
];

export default function* rootSaga() {
  yield all(allSaga.map((saga) => fork(saga)));
}
