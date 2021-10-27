import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getTransactionsActions from "../../actions/Transaction/GetTransaction";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteServiceGroupApi } from "../../apis/ServiceGroup/DeleteServiceGroup";
import { updateServiceGroupApi } from "../../apis/ServiceGroup/UpdateServiceGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const TransactionPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");

  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getTransactionsActions.getTransactions());
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

  const handleUpdateServiceName = async (id, description) => {
    try {
      console.log(data);
      await updateServiceGroupApi(id, { description });
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

  const submitForm = (data) => {
    handleUpdateServiceName(idService, data.description);
  };

  return (
    <div className="container ml-2 table-responsive-xl">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Tên giao dịch</th>
            <th scope="col">Đặt cọc</th>
            <th scope="col">Ngày/Giờ tạo</th>
            <th scope="col">Ngày/Giờ cập nhật</th>
            {/* <th scope="col">Trạng thái</th> */}
            <th scope="col">Khách hàng</th>
            <th scope="col">Đặt lịch</th>
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
                  <td className="col-2">{item.description}</td>
                  <td className="col-1">{item.deposit}</td>
                  <td className="col-2">
                    {moment(item.dateCreated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateCreated.substring(11, 16)}
                  </td>
                  <td className="col-2">
                    {moment(item.dateUpdated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateUpdated.substring(11, 16)}
                  </td>

                  {/* <td className="col-2">
                    {item.isDisable === false ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-info btn-sm"
                        // type="button"
                        // // onClick={() =>
                        // //   handleGetDescription(item.description, item.id)
                        // // }
                        // data-toggle="modal"
                        // data-target="#exampleModal"
                        // data-whatever="yah"
                      >
                        Kích hoạt
                      </button>
                    )}
                    {item.isDisable === true ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        // onClick={() => handleOnClickDelete(item.id)}
                      >
                        Khóa
                      </button>
                    )}
                  </td> */}
                  <td className="col-2">
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      // onClick={() =>
                      //   handleGetDescription(item.description, item.id)
                      // }
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="yah"
                    >
                      Thông tin
                    </button>
                  </td>
                  <td className="col-2">
                    <Link
                      className="btn btn-success btn-sm "
                      style={{ width: "170px", marginTop: "9px" }}
                      type="button"
                      to={`booking/${item.bookingId}`}
                      //style={{ paddingLeft: "55px", paddingRight: "55px" }}
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
  data: state.getTransaction.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(TransactionPage));
