import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getServiceByIdAction from "../../actions/ServicesGroup/GetServiceById";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";
import { deleteServiceApi } from "../../apis/Service/DeleteService";
import { updateServiceApi } from "../../apis/Service/UpdateServiceGroup";
import { updateServiceStatusApi } from "../../apis/Service/UpdateServiceStatus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";

const GetServiceById = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState(-1);
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [idService, setIdService] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const { id } = useParams();
  console.log(id);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getServiceByIdAction.getServiceById(id));
    dispatchAction(getServiceGroupsAction.getServiceGroups(id));
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
    serviceGroupId,
    description,
    unitPrice,
    type
  ) => {
    try {
      console.log(data);
      await updateServiceApi(id, {
        unitPrice,
        canInputQuantity: true,
        serviceGroupId,
        description,
        type,
      });
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

  const handleActive = (id) => {
    handleUpdateServiceStatus(id);
  };

  const handleUpdateServiceStatus = async (id) => {
    try {
      await updateServiceStatusApi(id);
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

  const handleGetDescription = (description, id, unitPrice, type) => {
    setDescription(description);
    setIdService(id);
    setUnitPrice(unitPrice);
    setType(type);
  };

  const submitForm = (data) => {
    var unitPriceNum = parseInt(data.unitPrice);
    handleUpdateServiceName(
      idService,
      idSerGroup,
      data.description,
      unitPriceNum,
      data.type
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
    <div className="container ml-2 table-responsive-xl">
      <div className="row m-0">
        <h2>Thông tin dịch vụ</h2>

        <NavLink
          type="button"
          to={`/add-service-item/${id}`}
          className="btn btn-warning btn-lg ml-auto mr-3"
        >
          Tạo dịch vụ
        </NavLink>
      </div>
      <div>
        <input
          className="ml-auto mr-4"
          type="text"
          placeholder="Tìm kiếm nhóm dịch vụ"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: "500px", height: "35px" }}
        />
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">Dịch vụ</th>
              <th scope="col">Loại</th>
              <th scope="col">Ngày/Giờ tạo</th>
              <th scope="col">Ngày/Giờ cập nhật</th>
              <th scope="col">Giá cả</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {data ? (
            data.length > 0 ? (
              data
                .filter((item) => {
                  if (search == "") {
                    return item;
                  } else if (
                    item.description &&
                    item.description
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return item;
                  } else {
                    return "";
                  }
                })
                .map((item, index) => (
                  <tbody>
                    <tr key={index}>
                      <td className="col-2 align-middle">
                        {item.description !== null ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.type === "AREA" ? (
                          ""
                        ) : (
                          <span className="text-primary  rounded p-1">
                            {item.type}
                          </span>
                        )}
                        {item.type === "QUANTITY" ? (
                          ""
                        ) : (
                          <span className="text-success  rounded p-1">
                            {item.type}
                          </span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.dateUpdated ? (
                          <span>
                            {moment(item.dateUpdated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateUpdated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.unitPrice !== null ? (
                          <span>{item.unitPrice} VND</span>
                        ) : (
                          <span>Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <span className="text-danger">Tạm dừng</span>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <span className="text-success border border-success rounded p-1">
                            Hoạt động
                          </span>
                        )}
                      </td>
                      <td className=" align-middle">
                        {item.isDisable === false ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-unlock-alt text-success"
                            type="button"
                            style={{ fontSize: "30px", marginTop: "8px" }}
                            onClick={() => handleActive(item.id)}
                          ></i>
                        )}
                        {item.isDisable === true ? (
                          ""
                        ) : (
                          <i
                            class="fa fa-lock text-danger"
                            type="button"
                            style={{ fontSize: "30px", marginTop: "8px" }}
                            onClick={() => handleOnClickDelete(item.id)}
                          ></i>
                        )}
                        <i
                          class="fa fa-edit"
                          type="button"
                          onClick={() =>
                            handleGetDescription(
                              item.description,
                              item.id,
                              item.unitPrice,
                              item.type,
                              item.serviceGroupId
                            )
                          }
                          data-toggle="modal"
                          data-target="#exampleModal"
                          data-whatever="yah"
                          style={{
                            fontSize: "30px",
                            margin: "auto",
                            marginTop: "8px",
                            marginLeft: "20px",
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
      </div>

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
                Cập nhật dịch vụ
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // style={{ marginLeft: "160px" }}
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
                    Dịch vụ
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("description")}
                    // defaultValue={description}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("type")}
                    // defaultValue={type}
                  >
                    <option selected> {type}</option>
                    <option value="AREA">AREA</option>
                    <option value="QUANTITY">QUANTITY</option>
                  </select>
                  {/* <p>{errors.type?.message}</p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Giá
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("unitPrice")}
                    // defaultValue={unitPrice}
                  />
                  <p>{errors.unitPrice?.message}</p>
                </div>

                <div
                  className="dropdown show w-100"
                  style={{ marginTop: "35px" }}
                >
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ paddingLeft: "95px", paddingRight: "95px" }}
                  >
                    {serGroup === "" ? "Nhóm dịch vụ" : serGroup}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {dataSerGroup ? (
                      dataSerGroup.length > 0 ? (
                        dataSerGroup.map((item, index) => (
                          <a
                            className="dropdown-item"
                            key={index}
                            onClick={() =>
                              handleGetSerGroup(item.id, item.description)
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : null
                    ) : (
                      <div>Progress...</div>
                    )}
                  </div>
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
  data: state.getServiceById.table,
  dataSerGroup: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetServiceById);
