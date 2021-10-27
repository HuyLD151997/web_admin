import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getBookingAction from "../../actions/Booking/GetBooking";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";
import { deleteServiceApi } from "../../apis/Service/DeleteService";
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
      await deleteServiceApi(id);
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
                      Trạng thái đặt lịch: {item.bookingStatusId}
                    </li>
                    <li className="list-group-item">
                      Diện tích dọn dẹp: {item.totalCleaningArea}
                    </li>
                    <li className="list-group-item">
                      Tổng chi phí: {item.totalPrice} VND
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBooking.table,
  dataSerGroup: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetBooking);
