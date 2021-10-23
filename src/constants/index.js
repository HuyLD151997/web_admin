import Login from "./../pages/login";
import HomePage from "./../pages/HomePage/AccountPage";
import CreateAccount from "./../pages/HomePage/CreateAccount";
import AccountCustomerPage from "./../pages/CustomerPage/AccountCustomerPage";
import ServiceGroupsPage from "./../pages/ServiceGroupsPage/ServiceGroupsPage";
import CreateGroupPage from "./../pages/ServiceGroupsPage/CreateGroupPage";
import NotFoundPage from "./../pages/NotFoundPage/NotFoundPage";
import DetailAccountPage from "./../pages/HomePage/DetailAccount";

export const ROUTES = [
  {
    path: "/",
    name: "Đăng nhập",
    exact: true,
    component: Login,
  },
];

export const ADMIN_ROUTES = [
  {
    path: "/home",
    name: "Trang chủ",
    exact: true,
    component: HomePage,
  },
  {
    path: "/add-account",
    name: "AddAccount",
    exact: true,
    component: CreateAccount,
  },
  {
    path: "/detail-account/:id",
    name: "DetailAccount",
    exact: true,
    component: DetailAccountPage,
  },
  {
    path: "/customer",
    name: "Customer",
    exact: true,
    component: AccountCustomerPage,
  },
  {
    path: "/service-group",
    name: "ServiceGroup",
    exact: true,
    component: ServiceGroupsPage,
  },
  {
    path: "/add-service",
    name: "CreateService",
    exact: true,
    component: CreateGroupPage,
  },
  {
    path: "",
    name: "",
    exact: false,
    component: NotFoundPage,
  },
];
