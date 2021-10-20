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
        Add New Account
      </Link>

      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Full Name</th>
            <th scope="col">Status</th>
            <th scope="col">Address</th>
            <th scope="col">Create Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr className="table-primary" key={index}>
                  <td>{item.userName}</td>
                  <td>{item.fullname}</td>
                  <td>
                    <span
                      className={
                        item.isDisable
                          ? "label label-danger"
                          : "label label-info"
                      }
                      //onClick={this.onUpdateStatus}
                    >
                      {item.isDisable === true ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td>
                    {item.address}
                    {item.province.description}
                    {item.district.description}
                    {item.ward.description}
                  </td>
                  <td>{item.dateCreated}</td>
                  <td>
                    {item.isDisable === false ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-info btn-sm"
                        type="button"
                        onClick={() => handleActive(item.id)}
                      >
                        Active
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
                        Delete
                      </button>
                    )}
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
