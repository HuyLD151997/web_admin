import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getListBookingAction from "../../actions/Booking/GetBooking";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const ListBookingPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");

  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getListBookingAction.getBookings());
  }, []);
  const { data } = props;

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGetDescription = (description, id) => {
    setDescription(description);
    setIdService(id);
  };

  return (
    <div className="container ml-2 table-responsive-xl">
      <h3>Danh sách đặt lịch</h3>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Nhân viên</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày/Giờ bắt đầu</th>

            <th scope="col"></th>
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr
                  // className={
                  //   item.isDisable === true ? "table-danger" : "table-primary"
                  // }
                  key={index}
                >
                  <td className=" align-middle">{index + 1}</td>
                  <td className=" align-middle">
                    {item.customer !== null ? (
                      <span>{item.customer.fullname}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </td>
                  <td className=" align-middle">
                    {item.employee === null ? (
                      <span>Chưa có dữ liệu</span>
                    ) : (
                      <span>{item.employee.fullname}</span>
                    )}
                  </td>
                  <td className=" align-middle">
                    {item.bookingStatus === null ? (
                      <span>Chưa có dữ liệu</span>
                    ) : (
                      <span>{item.bookingStatus.description}</span>
                    )}
                  </td>
                  <td className=" align-middle">
                    {moment(item.dateBegin).format("DD-MM-YYYY")}
                    &nbsp;/ {item.dateBegin.substring(11, 16)}
                  </td>

                  <td className=" align-middle">
                    <Link
                      type="button"
                      to={`/export-booking/${item.id}`}
                      style={{
                        fontSize: "30px",
                        // float: "right",
                        // marginTop: "5px",
                        margin: "auto",
                        marginLeft: "50px",
                      }}
                    >
                      <span className="btn btn-success"> Xuất tập tin</span>
                    </Link>
                    <Link
                      type="button"
                      to={`/booking-detail/${item.id}`}
                      style={{
                        fontSize: "30px",
                        // float: "right",
                        // marginTop: "5px",
                        margin: "auto",
                        marginLeft: "50px",
                      }}
                    >
                      <span className="btn btn-outline-info ">Chi tiết</span>
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
  data: state.getBooking.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ListBookingPage));
