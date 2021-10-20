import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Account",
    to: "/home",
    exact: true,
  },
  {
    name: "Service",
    to: "/service-list",
    exact: false,
  },
];

class SideBar extends Component {
  render() {
    return (
      <div id="side-bar h-100">
        <div
          className="logo text-secondary font-weight-bold"
          style={{
            background: "#fdcb08",
            paddingBottom: "13px",
            paddingTop: "19px",
            paddingLeft: "50px",
          }}
        >
          Be Clean
        </div>
        <ul className="list-group rounded-0 logo font-weight-bold ">
          {this.showMenus(menus)}
          {/* <li>
            <a href="service_list.html">
              <i className="fa fa-home" /> Service
            </a>
          </li>
          <li>
            <a href="booking.html">
              <i className="fa fa-list-alt" /> Booking
            </a>
          </li>
          <li>
            <a href="customer.html">
              <i className="fa fa-user" /> Customer
            </a>
          </li>
          <li>
            <a href="employee.html">
              <i className="fa fa-user" /> Employee
            </a>
          </li>
          <li>
            <a href="feelback.html">
              <i className="fa fa-envelope" /> Feedback
            </a>
          </li>
          <li>
            <a href="transaction.html">
              <i className="fa fa-shopping-cart" /> Transaction
            </a>
          </li> */}
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
              backgroundColor: "#fdcb08",
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
}

export default SideBar;
