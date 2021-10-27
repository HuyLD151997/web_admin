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
import getServiceByIdReducer from "./ServiceGroupReducer/GetServiceByIdReducer";
import putAvatarReducer from "./EmployeesReducer/PutAvatarReducer";
import transactionsReducer from "./TransactionsReducer/GetTransactionReducer";
import bookingsReducer from "./BookingsReducer/GetBookingReducer";

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
  getServiceById: getServiceByIdReducer,
  getTransaction: transactionsReducer,
  getBooking: bookingsReducer,
  avatarStringCode: putAvatarReducer,
});

export default rootReducers;
