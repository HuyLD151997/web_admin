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
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";

const ListBookingPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");
  const [search, setSearch] = useState("");
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageBooking = localStorage.getItem("TotalPageBooking");
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getListBookingAction.getBookings(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading } = props;

  console.log(data);

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

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
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row">
        <h3>Danh sách đặt lịch</h3>
        <input
          className="ml-auto mr-5"
          type="text"
          placeholder="Tìm kiếm mã đặt lịch"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: "500px", height: "35px" }}
        />
      </div>

      <table className="table">
        <thead className="table-light">
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Mã đặt lịch</th>
            <th scope="col">Khách hàng</th>
            {/* <th scope="col">Nhân viên</th> */}
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày/Giờ bắt đầu</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {!loading ? (
          data ? (
            data.data.length > 0 ? (
              data.data
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item.id &&
                    item.id.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return item;
                  } else {
                    return "";
                  }
                })
                .map((item, index) => (
                  <tbody>
                    <tr
                      // className={
                      //   item.isDisable === true ? "table-danger" : "table-primary"
                      // }
                      key={index}
                    >
                      {/* <td className=" align-middle">{index + 1}</td> */}
                      <td
                        className="col-3 align-middle"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        {item.id}
                      </td>
                      <td className="col-2 align-middle">
                        {item.customer !== null ? (
                          <span>{item.customer.fullname}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>

                      <td className="col-2 align-middle">
                        {item.bookingStatus === null ? (
                          <span>Chưa có dữ liệu</span>
                        ) : (
                          <span>{item.bookingStatus.description}</span>
                        )}
                      </td>
                      <td className="col-2 align-middle">
                        {moment(item.dateBegin).format("DD-MM-YYYY")}
                        &nbsp;/ {item.dateBegin.substring(11, 16)}
                      </td>

                      <td className="col-4 align-middle">
                        <Link
                          type="button"
                          to={`/export-booking/${item.id}`}
                          style={{
                            fontSize: "15px",
                            // float: "right",
                            // marginTop: "5px",
                            margin: "auto",
                            // marginLeft: "50px",
                          }}
                        >
                          <span className="btn btn-success"> Xuất tập tin</span>
                        </Link>
                        <Link
                          type="button"
                          to={`/booking-detail/${item.id}`}
                          style={{
                            fontSize: "15px",
                            // float: "right",
                            // marginTop: "5px",
                            margin: "auto",
                            marginLeft: "20px",
                          }}
                        >
                          <span className="btn btn-outline-info ">
                            Chi tiết
                          </span>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))
            ) : null
          ) : (
            <div>Chưa có dữ liệu</div>
          )
        ) : (
          <div>Loading .....</div>
        )}
      </table>
      <Pagination
        count={Math.ceil(totalPageBooking / perPage)}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBooking.table,
  loading: state.getBooking.loading,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ListBookingPage));
