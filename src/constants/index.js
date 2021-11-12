import Login from "./../pages/login";
import HomePage from "./../pages/HomePage/AccountPage";
import CreateAccount from "./../pages/HomePage/CreateAccount";
import AccountCustomerPage from "./../pages/CustomerPage/AccountCustomerPage";
import ServiceGroupsPage from "./../pages/ServiceGroupsPage/ServiceGroupsPage";
import CreateGroupPage from "./../pages/ServiceGroupsPage/CreateGroupPage";
import NotFoundPage from "./../pages/NotFoundPage/NotFoundPage";
import DetailAccountPage from "./../pages/HomePage/DetailAccount";
import GetServiceById from "./../pages/ServicePage/GetServiceById";
import CreateServiceItem from "./../pages/ServicePage/CreateServicePage";
import Transaction from "./../pages/Transaction/TransactionPage";
import TransactionCus from "./../pages/Transaction/TransactionCusPage";
import Booking from "./../pages/Booking/BookingPage";
import ListBooking from "./../pages/Booking/ListBookingPage";
import BookingLog from "./../pages/Booking/BookingLogPage";
import CleaningTool from "./../pages/CleaningTool/CleaningToolPage";

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
    path: "/detail-service-group/:id",
    name: "DetailService",
    exact: true,
    component: GetServiceById,
  },
  {
    path: "/add-service-item/:id",
    name: "CreateServiceItem",
    exact: true,
    component: CreateServiceItem,
  },
  {
    path: "/transaction",
    name: "Transaction",
    exact: true,
    component: Transaction,
  },
  {
    path: "/transactionCus",
    name: "TransactionCus",
    exact: true,
    component: TransactionCus,
  },
  {
    path: "/cleaning-tool",
    name: "CleaningTool",
    exact: true,
    component: CleaningTool,
  },
  {
    path: "/booking",
    name: "Đặt lịch",
    exact: true,
    component: ListBooking,
  },
  {
    path: "/booking-log",
    name: "Nhật ký",
    exact: true,
    component: BookingLog,
  },
  {
    path: "/booking-detail/:id",
    name: "Booking",
    exact: true,
    component: Booking,
  },
  {
    path: "",
    name: "",
    exact: false,
    component: NotFoundPage,
  },
];
