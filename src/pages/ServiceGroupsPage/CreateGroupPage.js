import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createServiceGroupApi } from "../../apis/ServiceGroup/CreateServiceGroup";
import { NavLink, Link, useParams } from "react-router-dom";

const CreateService = (props) => {
  const validationSchema = yup
    .object({
      serviceGroup: yup.string().required("Vui lòng nhập tên loại dịch vụ"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateService = async (description) => {
    try {
      await createServiceGroupApi({
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

    handleCreateService(data.serviceGroup);
  };

  return (
    <div>
      <div className="container mr-5">
        <h3 className="">Thêm loại dịch vụ</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="col">
                <div className="form-group">
                  <label>Loại dịch vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("serviceGroup")}
                  />
                  <p>{errors.serviceGroup?.message}</p>
                </div>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-warning "
                style={{
                  width: "100px",
                  marginLeft: "600px",
                  marginTop: "35px",
                }}
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  data: state.getProvince.table,
  dataWardAndDistrict: state.getWardsAndDistrics.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateService);
