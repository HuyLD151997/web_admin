import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getRequestCleaningToolHistoryActions from "../../actions/RequestCleaningTool/GetRequestCleaningToolHistory";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateCleaningToolApi } from "../../apis/CleaningTool/UpdateCleaningTool";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const RequestCleaningToolHistoryPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(
      getRequestCleaningToolHistoryActions.getRequestCleaningToolHistory()
    );
  }, []);
  const { data } = props;

  console.log(data);

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCleaningToolApi(id);
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

  const handleUpdateServiceName = async (id, description, quantity) => {
    try {
      console.log(data);
      await updateCleaningToolApi(id, { description, quantity });
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

  const handleUpdateImgCleaningTool = async (id, File) => {
    try {
      console.log(data);
      await updateCleaningToolImgApi(id, { File });
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

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
      quantity: yup
        .number()
        .typeError("Số lượng phải là số")
        .required("Số lượng không được để trống"),
      AvatarFile: yup.mixed().required("File is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Xem trước khi xuất tập tin</h2>
        <div className="ml-auto mr-3" style={{ marginLeft: "450px" }}>
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
            <th scope="col">Dụng cụ</th>
            <th scope="col">Nhân viên</th>
            <th scope="col">Lý do xin cấp phát</th>
            <th scope="col">Ngày/Giờ yêu cầu</th>
            <th scope="col">Ngày/Giờ cấp phát</th>
            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr className="">
                  <td className=" align-middle">
                    {item.cleaningTool.description}
                  </td>
                  <td className=" align-middle">{item.employee.fullname}</td>
                  <td className="align-middle">
                    {item.description === null ? (
                      <span>Không có dữ liệu</span>
                    ) : (
                      <span>{item.description}</span>
                    )}
                  </td>
                  <td className=" align-middle">
                    {moment(item.dateCreated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateCreated.substring(11, 16)}
                  </td>
                  <td className=" align-middle">
                    {moment(item.dateUpdated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateUpdated.substring(11, 16)}
                  </td>
                  <td className=" align-middle ">
                    {(() => {
                      switch (item.requestStatus.id) {
                        case "REJECTED":
                          return (
                            <span className="text-danger border border-danger rounded p-1">
                              <i class="fa fa-times-circle mr-1"></i>
                              {item.requestStatus.description}
                            </span>
                          );
                        case "CANCELLED":
                          return (
                            <span className="text-warning border border-warning rounded p-1">
                              <i class="fa fa-times-circle mr-1"></i>
                              {item.requestStatus.description}
                            </span>
                          );
                        case "PROVIDED":
                          return (
                            <span className="text-success border border-success rounded p-1">
                              <i class="fa fa-check-circle mr-1"></i>
                              {item.requestStatus.description}
                            </span>
                          );

                        default:
                          return null;
                      }
                    })()}
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
  data: state.getRequestCleaningToolHistory.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(RequestCleaningToolHistoryPage));
