import { combineReducers } from "redux";
import services from "./services";
import authenticateReducer from "./authentication/authentication";
import getEmployeesReducer from "./EmployeesReducer/GetEmployeesReducer";
import getProvincesReducer from "./EmployeesReducer/GetProvinceReducers";
import getWardsAndDistricsReducer from "./EmployeesReducer/GetWardAndDistricReducer";
import getWardsAndDistricsReducer2 from "./EmployeesReducer/GetWardAndDistricReducer2";
import getEmployeeByIdReducer from "./EmployeesReducer/GetEmployeeById";
import getCustomerReducer from "./CustomersReducer/GetCustomerReducer";
import getServiceGroupsReducer from "./ServiceGroupReducer/GetServiceGroupsReducer";
import searchServiceGroupReducer from "./ServiceGroupReducer/SearchServiceGroupReducer";
import getServiceByIdReducer from "./ServiceGroupReducer/GetServiceByIdReducer";
import putAvatarReducer from "./EmployeesReducer/PutAvatarReducer";
import transactionsReducer from "./TransactionsReducer/GetTransactionReducer";
import transactionUsersReducer from "./TransactionsReducer/GetTransactionUserReducer";
import transactionCompanyReducer from "./TransactionsReducer/GetTransactionCompanyReducer";
import bookingsReducer from "./BookingsReducer/GetBookingReducer";
import bookingDetailReducer from "./BookingsReducer/GetBookingDetailReducer";
import bookingImageReducer from "./BookingLogReducer/GetBookingImageReducer";
import bookingLogReducer from "./BookingLogReducer/GetBookingLogReducer";
import cleaningToolsReducer from "./CleaningTool/GetCleaningToolReducer";
import searchCleaningToolsReducer from "./CleaningTool/SearchCleaningToolReducer";
import requestCleaningToolPendingReducer from "./RequestCleaningTool/GetRequestCleaningToolPendingReducer";
import requestCleaningToolApprovedReducer from "./RequestCleaningTool/GetRequestCleaningToolApprovedReducer";
import requestCleaningToolHistoryReducer from "./RequestCleaningTool/GetRequestCleaningToolHistoryReducer";
import getSettingsReducer from "./SettingReducer/GetSettingReducer";
import getChartsReducer from "./ChartReducer/GetChartReducer";
import getChartTransactionReducer from "./ChartReducer/GetChartTransactionReducer";

const rootReducers = combineReducers({
  services,
  auth: authenticateReducer,
  getEmployees: getEmployeesReducer,
  getProvince: getProvincesReducer,
  getWardsAndDistrics: getWardsAndDistricsReducer,
  getWardsAndDistrics2: getWardsAndDistricsReducer2,
  getEmployeeById: getEmployeeByIdReducer,
  getCustomers: getCustomerReducer,
  getServiceGroups: getServiceGroupsReducer,
  searchServiceGroup: searchServiceGroupReducer,
  getServiceById: getServiceByIdReducer,
  getTransaction: transactionsReducer,
  getTransactionUser: transactionUsersReducer,
  getTransactionCompany: transactionCompanyReducer,
  getBooking: bookingsReducer,
  getBookingDetail: bookingDetailReducer,
  getBookingImage: bookingImageReducer,
  getBookingLog: bookingLogReducer,
  getRequestCleaningToolPending: requestCleaningToolPendingReducer,
  getRequestCleaningToolApproved: requestCleaningToolApprovedReducer,
  getRequestCleaningToolHistory: requestCleaningToolHistoryReducer,
  avatarStringCode: putAvatarReducer,
  cleaningTool: cleaningToolsReducer,
  searchCleaningTool: searchCleaningToolsReducer,
  getSetting: getSettingsReducer,
  getChart: getChartsReducer,
  getChartTransaction: getChartTransactionReducer,
});

export default rootReducers;
