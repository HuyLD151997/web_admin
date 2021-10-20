import React, { Component, useEffect } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getServiceGroupsActions from "../../actions/ServicesGroup/GetServiceGroups";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteServiceGroupApi } from "../../apis/ServiceGroup/DeleteServiceGroup";
import { updateEmployeeStatusApi } from "../../apis/Employees/UpdateEmployeeStatus";

const ServiceGroupsPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getServiceGroupsActions.getServiceGroups());
  }, []);
  const { data } = props;

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteServiceGroupApi(id);
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
      <Link type="button" to="/add-service" className="btn btn-warning btn-lg ">
        Create Services
      </Link>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Dịch vụ</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
            <th scope="col">Thông tin chi tiết</th>
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
                  <td className="col-3">{item.description}</td>
                  <td className="col-3">
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
                  <td className="col-3">
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
                        Xóa
                      </button>
                    )}
                  </td>
                  <td className="col-3">
                    <button
                      className="btn btn-success btn-sm"
                      type="button"
                      onClick={() => handleOnClickDelete(item.id)}
                    >
                      Chi tiết
                    </button>
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
  data: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ServiceGroupsPage));
