import React, { Component, useEffect } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getEmployeesActions from "../../actions/Employees/GetEmployees";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployeeApi } from "../../apis/Employees/DeleteEmployee";
import { updateEmployeeStatusApi } from "../../apis/Employees/UpdateEmployeeStatus";
const AccountPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getEmployeesActions.getEmployees());
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
    <div className="container ml-2 table-responsive-xl">
      <Link type="button" to="/add-account" className="btn btn-warning btn-lg ">
        Create Employee Account
      </Link>

      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Tên tài khoản</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Hành động</th>
            <th scope="col">Thông tin</th>
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr
                  className={
                    item.isDisable === true ? "table-danger" : "table-primary"
                  }
                  key={index}
                >
                  <td className="col-2">{item.userName}</td>
                  <td className="col-2">{item.fullname}</td>

                  <td>
                    {item.address}, &nbsp;
                    {item.ward.description}, &nbsp;
                    {item.district.description}, &nbsp;
                    {item.province.description}.
                  </td>

                  <td className="col-2">
                    {item.isDisable === false ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-info btn-sm"
                        type="button"
                        onClick={() => handleActive(item.id)}
                      >
                        Kích hoạt
                      </button>
                    )}
                    {item.isDisable === true ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => handleOnClickDelete(item.id)}
                      >
                        Khóa
                      </button>
                    )}
                  </td>
                  <td className="col-2" style={{ paddingTop: "20px" }}>
                    <Link
                      className="btn btn-success btn-sm "
                      type="button"
                      to={`/detail-account/${item.id}`}
                      style={{ paddingLeft: "55px", paddingRight: "55px" }}
                    >
                      Chi tiết
                    </Link>
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
  data: state.getEmployees.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(AccountPage));
