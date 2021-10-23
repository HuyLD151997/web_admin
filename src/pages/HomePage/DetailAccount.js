import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getAccountByIdAction from "../../actions/Employees/GetEmployById";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";

const DetailAccount = (props) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getAccountByIdAction.getEmployeeById(id));
  }, []);
  const { data } = props;
  console.log(data);
  return (
    <div>
      {data ? (
        data.length > 0 ? (
          data.map((item, index) => (
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <ul
                    className="list-group list-group-flush"
                    style={{ width: "270px" }}
                  >
                    <li className="list-group-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnq9pVEA16U0vH0nT0UeFY9vrTn99Za2a7QWub_dBpXSYTCZtBQULWaaRJ4ENFreEmPc&usqp=CAU" />
                    </li>
                    <li className="list-group-item">
                      <span
                        className={
                          item.isDisable ? "btn btn-danger" : "btn btn-success"
                        }
                        //onClick={this.onUpdateStatus}
                      >
                        Trạng thái đang{" "}
                        {item.isDisable === true ? "bị khóa" : "hoạt động"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-8">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Tên tài khoản: {item.userName}
                    </li>
                    <li className="list-group-item">
                      Họ và tên: {item.fullname}
                    </li>
                    <li className="list-group-item">
                      Địa chỉ: {item.address}, &nbsp;
                      {item.ward.description}, &nbsp;
                      {item.district.description}, &nbsp;
                      {item.province.description}.
                    </li>
                    <li className="list-group-item">
                      Giới tính: {item.gender}
                    </li>
                    <li className="list-group-item">
                      Ngày tạo / giờ tạo:&nbsp;
                      {moment(item.dateCreated).format("DD/MM/YYYY")}
                      &nbsp;/ {item.dateCreated.substring(11, 16)}
                    </li>
                    <li className="list-group-item">
                      Ngày cập nhật / giờ cập nhật:&nbsp;
                      {moment(item.dateUpdated).format("DD/MM/YYYY")}
                      &nbsp;/ {item.dateUpdated.substring(11, 16)}
                    </li>
                    <li className="list-group-item">
                      Email: {item.email}{" "}
                      {item.emailConfirmed === true ? (
                        <i class="fa fa-check-circle btn btn-success">
                          Đã xác nhận
                        </i>
                      ) : (
                        <span className="btn btn-warning ">
                          Chưa xác nhận
                          <i class="fa fa-times-circle ml-2"></i>
                        </span>
                      )}
                    </li>
                    <li className="list-group-item">
                      Số điện thoại: {item.phoneNumber}
                    </li>
                    <li className="list-group-item">Số dư: {item.balance}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : null
      ) : (
        <div>Progress .....</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getEmployeeById.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(DetailAccount);
