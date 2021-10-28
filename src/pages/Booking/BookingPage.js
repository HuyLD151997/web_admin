import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getBookingAction from "../../actions/Booking/GetBooking";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";
import { deleteBookingApi } from "../../apis/Booking/DeleteBooking";
import { updateServiceApi } from "../../apis/Service/UpdateServiceGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";

const GetBooking = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState(-1);
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [idService, setIdService] = useState("");
  const { id } = useParams();
  console.log(id);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getBookingAction.getBookings(id));
  }, []);
  const { data, dataSerGroup } = props;

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleGetSerGroup = (id, description) => {
    console.log("description" + description);
    setIdSerGroup(id);
    setSerGroup(description);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBookingApi(id);
      Swal.fire({
        icon: "success",
        text: "delete status success",
        timer: 2000,
        showConfirmButton: false,
      });
      // window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "delete failed ",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdateServiceName = async (
    id,
    description,
    unitPrice,
    canInputQuantity
  ) => {
    try {
      console.log(data);
      await updateServiceApi(id, {
        description,
        unitPrice,
        canInputQuantity,
      });
      Swal.fire({
        icon: "success",
        text: "active status success",
        timer: 2000,
        showConfirmButton: false,
      });
      //window.location.reload();
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
      unitPrice: yup.string().required("Giá tiền dịch vụ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGetDescription = (description, id, unitPrice) => {
    setDescription(description);
    setIdService(id);
    setUnitPrice(unitPrice);
  };

  const submitForm = (data) => {
    handleUpdateServiceName(
      idService,
      data.description,
      data.unitPrice,
      data.canInputQuantity
    );
  };
  console.log(data);
  return (
    // <div>
    //   {data ? (
    //     data.length > 0 ? (
    //       data.map((item, index) => <p>{item.description}</p>)
    //     ) : null
    //   ) : (
    //     <div>Progress .....</div>
    //   )}
    // </div>
    <div>
      <h2 style={{ textAlign: "center" }}>Thông tin đặt lịch</h2>
      {data ? (
        data.length > 0 ? (
          data.map((item, index) => (
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Dịch vụ: {item.description}
                    </li>

                    <li className="list-group-item">
                      Diện tích dọn dẹp: {item.totalCleaningArea}
                    </li>
                    <li className="list-group-item">
                      Tổng chi phí: {item.totalPrice} VND
                    </li>
                    <li className="list-group-item p-0 pl-3">
                      Trạng thái đặt lịch: {item.bookingStatusId}
                      <button
                        className="btn btn-warning btn-sm ml-1"
                        type="button"
                        onClick={() =>
                          handleGetDescription(item.description, item.id)
                        }
                        data-toggle="modal"
                        data-target="#exampleModal"
                        data-whatever="yah"
                        style={{ width: "100px" }}
                      >
                        Cập nhật
                      </button>
                    </li>
                    <li className="list-group-item">
                      {/* <input type="file" name="img-upload" /> */}
                      <span
                        className={
                          item.isDisable === true
                            ? "btn btn-danger"
                            : "btn btn-success"
                        }
                        //onClick={this.onUpdateStatus}
                      >
                        Trạng thái đang{" "}
                        {item.isDisable === true ? "bị khóa" : "hoạt động"}
                      </span>
                      <span>
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <button
                            className="btn btn-info btn-sm"
                            type="button"
                            // onClick={() => handleActive(item.id)}
                          >
                            Kích hoạt
                          </button>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <button
                            className="btn btn-danger btn-sm ml-1"
                            type="button"
                            style={{ width: "100px", height: "38px" }}
                            onClick={() => handleOnClickDelete(item.id)}
                          >
                            Khóa
                          </button>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Ngày/ Giờ bắt đầu: &nbsp;
                      {moment(item.dateBegin).format("DD/MM/YYYY")}
                      &nbsp;/ {item.dateBegin.substring(11, 16)}
                    </li>
                    <li className="list-group-item">
                      Ngày/ Giờ bắt đầu: &nbsp;
                      {item.dateEnd ? (
                        <div>
                          {moment(item.dateEnd).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateEnd.substring(11, 16)}
                        </div>
                      ) : (
                        <span>Chưa hoàn thành</span>
                      )}
                    </li>
                    {/* <li className="list-group-item">
                      Địa chỉ: {item.address}, &nbsp;
                      {item.ward.description}, &nbsp;
                      {item.district.description}, &nbsp;
                      {item.province.description}.
                    </li> */}
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
                    <li className="list-group-item">Địa chỉ: {item.address}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : null
      ) : (
        <div>Progress .....</div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="exampleModalLabel">
                Cập nhật dịch vụ tên {description}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" style={{ float: "right" }}>
                  ×
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Trạng thái đặt lịch
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("description")}
                  />
                  <p>{errors.description?.message}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBooking.table,
  dataSerGroup: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetBooking);
