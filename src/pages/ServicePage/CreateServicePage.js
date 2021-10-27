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
    description
  ) => {
    try {
      console.log(unitPrice);
      await createServiceApi({
        unitPrice,
        canInputQuantity: true,
        serviceGroupId,
        description,
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
    console.log(priceNumber);
    handleCreateService(priceNumber, id, data.description);
  };

  return (
    <div>
      <div className="container w-100">
        <h3 className="">Thêm loại dịch vụ</h3>
        <div
          className=" border border-warning"
          style={{ width: "400px", paddingLeft: "60px", padding: "20px" }}
        >
          <form
            className="border-0 row"
            onSubmit={handleSubmit(submitForm)}
            style={{ width: "100%" }}
          >
            <div className="">
              <div className="row-12">
                <div className="form-group">
                  <label>Loại dịch vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("description")}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="dropdown show" style={{ marginTop: "35px" }}>
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
                    type="text"
                    className="form-control"
                    {...register("unitPrice")}
                  />
                  {/* <p>{errors.serviceGroup?.message}</p> */}
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-warning "
                    style={{
                      width: "100px",
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
