import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getAccountByIdAction from "../../actions/Employees/GetEmployById";
import * as putAvatarAction from "../../actions/Employees/PutAvatar";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";

const DetailAccount = (props) => {
  const { id } = useParams();
  const dispatchAction = useDispatch();
  const [picture, setPicture] = useState();

  useEffect(() => {
    dispatchAction(getAccountByIdAction.getEmployeeById(id));
  }, []);
  const { data, avatarCode } = props;
  console.log(data);

  const readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsBinaryString(file);
    });
  };

  const onChangePicture = (e) => {
    console.log("picture: ", e.target.files[0]);
    console.log(readFileDataAsBase64(e));
    // dispatchAction(putAvatarAction.putAvatar();
  };

  return (
    <div>
      {data ? (
        data.length > 0 ? (
          data.map((item, index) => (
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <ul
                    className="list-group list-group-flush"
                    style={{ width: "270px" }}
                  >
                    <li className="list-group-item">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnq9pVEA16U0vH0nT0UeFY9vrTn99Za2a7QWub_dBpXSYTCZtBQULWaaRJ4ENFreEmPc&usqp=CAU" />
                    </li>
                    <li className="list-group-item">
                      {/* <input type="file" name="img-upload" /> */}
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
                      Địa chỉ:{" "}
                      {item.address !== null ? (
                        <span>{item.address}</span>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                      {item.ward !== null ? (
                        <span>, &nbsp;{item.ward.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.district !== null ? (
                        <span>, &nbsp;{item.district.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.province !== null ? (
                        <span>, &nbsp;{item.province.description}</span>
                      ) : (
                        <span></span>
                      )}
                      .
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
  avatarCode: state.avatarStringCode.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(DetailAccount);
