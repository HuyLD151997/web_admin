import { combineReducers } from "redux";
import services from "./services";
import authenticateReducer from "./authentication/authentication";
import getEmployeesReducer from "./EmployeesReducer/GetEmployeesReducer";
import getProvincesReducer from "./EmployeesReducer/GetProvinceReducers";
import getWardsAndDistricsReducer from "./EmployeesReducer/GetWardAndDistricReducer";
import getEmployeeByIdReducer from "./EmployeesReducer/GetEmployeeById";
import getCustomerReducer from "./CustomersReducer/GetCustomerReducer";
import getServiceGroupsReducer from "./ServiceGroupReducer/GetServiceGroupsReducer";

const rootReducers = combineReducers({
  services,
  auth: authenticateReducer,
  getEmployees: getEmployeesReducer,
  getProvince: getProvincesReducer,
  getWardsAndDistrics: getWardsAndDistricsReducer,
  getEmployeeById: getEmployeeByIdReducer,
  getCustomers: getCustomerReducer,
  getServiceGroups: getServiceGroupsReducer,
});

export default rootReducers;
