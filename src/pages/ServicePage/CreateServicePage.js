import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createServiceApi } from "../../apis/Service/CreateService";
import { NavLink, Link, useParams } from "react-router-dom";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";

const CreateServiceItem = (props) => {
  const [serGroup, setSerGroup] = useState("");
  const [idSerGroup, setIdSerGroup] = useState(-1);
  const { id } = useParams();
  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(getServiceGroupsAction.getServiceGroups(id));
  }, []);
  const { data } = props;
  const handleGetSerGroup = (id, description) => {
    console.log("description" + description);
    setIdSerGroup(id);
    setSerGroup(description);
  };
  const validationSchema = yup
    .object({
      description: yup.string().required("Vui lòng nhập tên loại dịch vụ"),
      estiamtedMinutes: yup.number().required("Vui lòng nhập thời gian làm"),
      unitPrice: yup.number().required("Vui lòng nhập giá tiền"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateService = async (
    unitPrice,
    serviceGroupId,
    description,
    estiamtedMinutes,
    type
  ) => {
    try {
      await createServiceApi({
        unitPrice,
        canInputQuantity: true,
        serviceGroupId,
        description,
        estiamtedMinutes,
        type,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo tài khoản thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/service-group");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: er.response.data,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const submitForm = (data) => {
    // console.log(typeof data.phoneNumber.toString());
    var priceNumber = parseInt(data.unitPrice);

    handleCreateService(
      priceNumber,
      id,
      data.description,
      data.estiamtedMinutes,
      data.type
    );
  };

  return (
    <div>
      <div className="container col-12">
        <h3 className="">Thêm loại dịch vụ</h3>
        <div
          className=" border border-warning col-10"
          // style={{ width: "400px", paddingLeft: "60px", padding: "20px" }}
        >
          <form
            className="border-0 row col-10 ml-5 mt-4 mb-4"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="col-12">
              <div className="row-12">
                <div className="form-group">
                  <label>Mô tả</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("description")}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label>Thời gian làm</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("estiamtedMinutes")}
                  />
                  <p>{errors.estiamtedMinutes?.message}</p>
                </div>
                <div className="form-group">
                  <label>Loại</label>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("type")}
                  >
                    <option selected> Chọn</option>
                    <option value="AREA">AREA</option>
                    <option value="QUANTITY">QUANTITY</option>
                  </select>
                  <p>{errors.type?.message}</p>
                </div>
                <div className="dropdown show" style={{ marginTop: "35px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle col-12"
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
                    {data ? (
                      data.length > 0 ? (
                        data.map((item, index) => (
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
                <div className="form-group">
                  <label>Giá cả</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("unitPrice")}
                  />
                  <p>{errors.unitPrice?.message}</p>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-warning col-12"
                    style={{
                      marginTop: "35px",
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateServiceItem);
