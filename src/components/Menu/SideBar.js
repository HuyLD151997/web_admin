import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const account = [
  {
    name: "Nhân viên",
    to: "/home",
    exact: true,
  },
  {
    name: "Khách hàng",
    to: "/customer",
    exact: false,
  },
];

const transaction = [
  {
    name: "Đặt lịch",
    to: "/transaction",
    exact: false,
  },
  {
    name: "Khách hàng",
    to: "/transactionCus",
    exact: false,
  },
];

const menus = [
  {
    name: "Dịch vụ",
    to: "/service-group",
    exact: false,
  },

  {
    name: "Đặt lịch",
    to: "/booking",
    exact: false,
  },
  {
    name: "Dụng cụ",
    to: "/cleaning-tool",
    exact: false,
  },
];

class SideBar extends Component {
  render() {
    return (
      <div id="side-bar h-100">
        <div
          className="logo text-secondary font-weight-bold "
          style={{
            background: "#fdcb08",
            paddingBottom: "13px",
            paddingTop: "29px",
            paddingLeft: "50px",
          }}
        >
          Be Clean
        </div>

        <ul className="navbar-nav rounded-0 logo font-weight-bold">
          <li className="nav-item dropdown mb-1">
            <span
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Tài khoản<i class="fa fa-caret-down"></i>
            </span>
            <div class="collapse " id="collapseExample">
              <span className="dropdown-item" style={{ background: "#fdcb08" }}>
                {this.showAccount(account)}
              </span>
            </div>
          </li>
          <li className="nav-item dropdown mb-1">
            <span
              data-toggle="collapse"
              href="#collapseExample2"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Giao dịch<i class="fa fa-caret-down"></i>
            </span>
            <div class="collapse " id="collapseExample2">
              <span className="dropdown-item" style={{ background: "#fdcb08" }}>
                {this.showTransaction(transaction)}
              </span>
            </div>
          </li>

          <li className="nav-item">{this.showMenus(menus)}</li>
        </ul>
      </div>
    );
  }

  showMenus = (menus) => {
    var result = null;
    if (menus.length > 0) {
      result = menus.map((menu, index) => {
        return (
          <NavLink
            activeStyle={{
              backgroundColor: "#FF9900",
              color: "white",
            }}
            className="nav-link"
            exact={menu.exact}
            to={menu.to}
            key={index}
          >
            {menu.name}
            <span className="sr-only">(current)</span>
          </NavLink>
        );
      });
    }
    return result;
  };

  showAccount = (account) => {
    var result = null;
    if (account.length > 0) {
      result = account.map((account, index) => {
        return (
          <NavLink
            activeStyle={{
              backgroundColor: "#FF9900",
              color: "white",
            }}
            className="nav-link"
            exact={account.exact}
            to={account.to}
            key={index}
          >
            {account.name}
            <span className="sr-only">(current)</span>
          </NavLink>
        );
      });
    }
    return result;
  };

  showTransaction = (transaction) => {
    var result = null;
    if (transaction.length > 0) {
      result = transaction.map((transaction, index) => {
        return (
          <NavLink
            activeStyle={{
              backgroundColor: "#FF9900",
              color: "white",
            }}
            className="nav-link"
            exact={transaction.exact}
            to={transaction.to}
            key={index}
          >
            {transaction.name}
            <span className="sr-only">(current)</span>
          </NavLink>
        );
      });
    }
    return result;
  };
}

export default SideBar;
