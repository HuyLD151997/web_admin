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
      <h3>Giao dịch đặt lịch</h3>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ghi chú</th>
            <th scope="col">Nhân viên</th>
            <th scope="col">Ngày/Giờ tạo</th>
            {/* <th scope="col">Trạng thái</th> */}
          </tr>
        </thead>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr className="" key={index}>
                  <td className="">
                    <i
                      class="fa fa-check-circle text-success"
                      style={{
                        fontSize: "30px",
                      }}
                    ></i>
                  </td>
                  <td className="">{item.description}</td>
                  <td className="">
                    {item.booking ? (
                      <span>
                        {item.booking.employee !== null ? (
                          <span>{item.booking.employee.fullname}</span>
                        ) : (
                          <span>Chưa tìm thấy</span>
                        )}
                      </span>
                    ) : (
                      <span>Chưa tìm thấy</span>
                    )}
                  </td>
                  <td className="">
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
  data: state.getTransaction.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(TransactionPage));
