import React, { Component, useEffect } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getCustomersActions from "../../actions/Customer/GetCustomers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployeeApi } from "../../apis/Employees/DeleteEmployee";
import { updateEmployeeStatusApi } from "../../apis/Employees/UpdateEmployeeStatus";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as moment from "moment";

const AccountCustomerPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getCustomersActions.getCustomers());
  }, []);
  const { data } = props;

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeApi(id);
      Swal.fire({
        icon: "success",
        text: "delete status success",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "delete failed ",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleActive = (id) => {
    handleUpdateEmployeeStatus(id);
  };

  const handleUpdateEmployeeStatus = async (id) => {
    try {
      await updateEmployeeStatusApi(id);
      Swal.fire({
        icon: "success",
        text: "active status success",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "active failed ",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Xem trước khi xuất tập tin</h2>
        <div className="col-3" style={{ marginLeft: "450px" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success"
            // className="btn btn-success mx-auto d-block"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Tải file excel"
          />
        </div>
      </div>
      <table className="table align-middle mt-2" id="table-to-xls">
        <thead className="table-light">
          <tr>
            <th scope="col">Tài khoản</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Số dư</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Ngày / giờ tạo tài khoản</th>
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr className="align-middle" key={index}>
                  <td className="align-middle">{item.userName}</td>
                  <td className="align-middle">{item.fullname}</td>
                  <td className="align-middle">
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
                  </td>
                  <td className="align-middle">{item.balance} VND</td>
                  <td className="align-middle">{item.gender}</td>
                  <td className="align-middle">{item.email}</td>
                  <td className="align-middle">{item.phoneNumber}</td>
                  <td className="align-middle">
                    {moment(item.dateCreated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateCreated.substring(11, 16)}
                  </td>
                </tr>
              </tbody>
            ))
          ) : null
        ) : (
          <div>Progress .....</div>
        )}
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getCustomers.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(AccountCustomerPage));
