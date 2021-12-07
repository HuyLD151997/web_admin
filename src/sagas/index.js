import { fork, all } from "redux-saga/effects";
import { sagas as authenticateSagas } from "./authentication/authentication";
import { sagas as getEmployeesSagas } from "./EmployeesSagas/GetEmployeesSaga";
import { sagas as getProvincesSagas } from "./EmployeesSagas/GetProvincesSagas";
import { sagas as getWardsAndDistricsSaga } from "./EmployeesSagas/GetWardAndDistricSagas";
import { sagas as getWardsAndDistricsSaga2 } from "./EmployeesSagas/GetWardAndDistricSagas2";
import { sagas as getEmployByIdSaga } from "./EmployeesSagas/GetEmployByIdSaga";
import { sagas as getCustomersSaga } from "./CustomerSagas/GetCustomersSaga";
import { sagas as getServiceGroupsSaga } from "./ServiceGroupsSagas/GetServiceGroupsSaga";
import { sagas as searchServiceGroupToolSaga } from "./ServiceGroupsSagas/SearchServiceGroupSaga";
import { sagas as getServiceByIdSaga } from "./ServiceGroupsSagas/GetServiceByIdSaga";
import { sagas as getTransactionSaga } from "./TransactionSagas/GetTransactionSaga";
import { sagas as getTransactionUserSaga } from "./TransactionSagas/GetTransactionUserSaga";
import { sagas as getTransactionCompanySaga } from "./TransactionSagas/GetTransactionCompanySaga";
import { sagas as getBookingSaga } from "./BookingSagas/GetBookingSaga";
import { sagas as getBookingDetailSaga } from "./BookingSagas/GetBookingDetailSaga";
import { sagas as putAvatarSaga } from "./EmployeesSagas/PutAvatarSaga";
import { sagas as getCleaningToolSaga } from "./CleaningTool/GetCleaningToolSaga";
import { sagas as searchCleaningToolSaga } from "./CleaningTool/SearchCleaningToolSaga";
import { sagas as getBookingImageSaga } from "./BookingLogSagas/GetBookingImageSaga";
import { sagas as getBookingLogSaga } from "./BookingLogSagas/GetBookingLogSaga";
import { sagas as getRequestCleaningToolPendingSaga } from "./RequestCleaningToolSagas/GetRequestCleaningToolPendingSaga";
import { sagas as getRequestCleaningToolApprovedSaga } from "./RequestCleaningToolSagas/GetRequestCleaningToolApprovedSaga";
import { sagas as getRequestCleaningToolHistorySaga } from "./RequestCleaningToolSagas/GetRequestCleaningToolHistorySaga";
import { sagas as getSettingSaga } from "./SettingSagas/GetSettingSaga";
import { sagas as getChartSaga } from "./ChartSagas/GetChartSaga";
import { sagas as getChartTransactionSaga } from "./ChartSagas/GetChartTransactionSaga";

const allSaga = [
  ...authenticateSagas,
  ...getEmployeesSagas,
  ...getProvincesSagas,
  ...getWardsAndDistricsSaga,
  ...getWardsAndDistricsSaga2,
  ...getEmployByIdSaga,
  ...getCustomersSaga,
  ...getServiceGroupsSaga,
  ...searchServiceGroupToolSaga,
  ...getServiceByIdSaga,
  ...putAvatarSaga,
  ...getTransactionSaga,
  ...getTransactionUserSaga,
  ...getTransactionCompanySaga,
  ...getBookingSaga,
  ...getBookingDetailSaga,
  ...getCleaningToolSaga,
  ...searchCleaningToolSaga,
  ...getBookingImageSaga,
  ...getBookingLogSaga,
  ...getRequestCleaningToolPendingSaga,
  ...getRequestCleaningToolApprovedSaga,
  ...getRequestCleaningToolHistorySaga,
  ...getSettingSaga,
  ...getChartSaga,
  ...getChartTransactionSaga,
];

export default function* rootSaga() {
  yield all(allSaga.map((saga) => fork(saga)));
}
