import { combineReducers } from "redux";
import services from "./services";
import authenticateReducer from "./authentication/authentication";
import getEmployeesReducer from "./EmployeesReducer/GetEmployeesReducer";
import getProvincesReducer from "./EmployeesReducer/GetProvinceReducers";
import getWardsAndDistricsReducer from "./EmployeesReducer/GetWardAndDistricReducer";
import getEmployeeByIdReducer from "./EmployeesReducer/GetEmployeeById";

const rootReducers = combineReducers({
  services,
  auth: authenticateReducer,
  getEmployees: getEmployeesReducer,
  getProvince: getProvincesReducer,
  getWardsAndDistrics: getWardsAndDistricsReducer,
  getEmployeeById: getEmployeeByIdReducer,
});

export default rootReducers;
