import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getCleaningToolsActions from "../../actions/CleaningTool/GetCleaningTool";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteServiceGroupApi } from "../../apis/ServiceGroup/DeleteServiceGroup";
import { updateServiceGroupApi } from "../../apis/ServiceGroup/UpdateServiceGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const CleaningToolPage = (props) => {
  const [description, setDescription] = useState("");
  const [idService, setIdService] = useState("");

  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getCleaningToolsActions.getCleaningTools());
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
            <th scope="col">Dụng cụ</th>
            <th scope="col">Ngày/Giờ tạo</th>
            <th scope="col">Ngày/Giờ cập nhật</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
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

                  <td className="col-2">
                    {moment(item.dateCreated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateCreated.substring(11, 16)}
                  </td>
                  <td className="col-2">
                    {moment(item.dateUpdated).format("DD/MM/YYYY")}
                    &nbsp;/ {item.dateUpdated.substring(11, 16)}
                  </td>
                  <td className="col-2">
                    {item.isDisable === false ? (
                      ""
                    ) : (
                      <i
                        class="fa fa-unlock-alt text-success"
                        type="button"
                        style={{ fontSize: "30px", margin: "auto" }}
                        // onClick={() => handleActive(item.id)}
                      ></i>
                    )}
                    {item.isDisable === true ? (
                      ""
                    ) : (
                      <i
                        class="fa fa-lock text-danger"
                        type="button"
                        style={{
                          fontSize: "30px",
                          margin: "auto",
                          marginTop: "8px",
                        }}
                        onClick={() => handleOnClickDelete(item.id)}
                      ></i>
                    )}
                  </td>
                  <td className="col-2">
                    <i
                      class="fa fa-edit"
                      type="button"
                      onClick={() =>
                        handleGetDescription(item.description, item.id)
                      }
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="yah"
                      style={{
                        fontSize: "30px",
                        margin: "auto",
                        marginTop: "8px",
                      }}
                    ></i>
                  </td>
                </tr>
              </tbody>
            ))
          ) : null
        ) : (
          <div>Progress .....</div>
        )}
      </table>
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
                {/* <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    tên dịch vụ:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("description")}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Thuộc loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("type")}
                  >
                    <option selected>Loại</option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="OVERALL">OVERALL</option>
                    <option value="OPTIONAL">OPTIONAL</option>
                  </select>
                  <p>{errors.type?.message}</p>
                </div> */}
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
  data: state.cleaningTool.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(CleaningToolPage));
