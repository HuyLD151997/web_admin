import React, { Component, useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import * as getProvinceActions from "../../actions/Employees/GetProvince";
import * as getWardsAndDistrics from "../../actions/Employees/GetWardAndDistric";
import * as getAccountByIdAction from "../../actions/Employees/GetEmployById";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createAccountApi } from "../../apis/Employees/createAccountEmployeeApi";
import { NavLink, Link, useParams } from "react-router-dom";

const CreateAccount = (props) => {
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [idCity, setIDCity] = useState(-1);
  const [idWard, setIDWard] = useState(-1);
  const [idDistrict, setIDDistrict] = useState(-1);

  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getProvinceActions.getProvinces());
  }, []);
  const { data, dataWardAndDistrict } = props;
  const handleGetWardAndDistric = (id, city) => {
    setCity(city);
    setIDCity(id);
    dispatchAction(getWardsAndDistrics.getWardsAndDistrics(id));
    setWard("");
    setDistrict("");
  };
  const handleGetWardAndDistric2 = (id, ward, idC, idW) => {
    console.log(ward);
    console.log(idC);
    setWard(ward);

    // if (ward && id === idWard) {

    if (ward) {
      dispatchAction(getWardsAndDistrics.getWardsAndDistrics(id));

      setIDWard(id);
    } else if (ward && id !== idW) {
      dispatchAction(getWardsAndDistrics.getWardsAndDistrics(idC));
    }
    // }
    // setIDWard(id);

    setDistrict("");
  };
  const handleGetWardAndDistric3 = (id, district) => {
    setDistrict(district);
    setIDDistrict(id);
  };

  const validationSchema = yup
    .object({
      username: yup.string().required("Tên người dùng không được để trống"),
      phoneNumber: yup
        .number()
        .typeError("Số điện thoại phải là số")
        .required("Số đt không được để trống"),
      password: yup
        .string()
        .min(6, "password phải lớn hơn hoặc bằng 6 kí tự")
        .required("password không được để trống"),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "password xác nhận phải trùng với password"
        )
        .required("Password xác nhận không được để trống"),
      fullname: yup.string().required("Fullname không được để trống"),
      birthday: yup.string().required("Ngày sinh không được để trống"),
      gender: yup
        .string()
        .required("Giới tính không được để trống")
        .matches(/(nam|nữ)/, "Phải điền đúng nam hoặc nữ"),
      email: yup
        .string()
        .email("email không hợp lệ")
        .required("Email không được để trống"),
      address: yup.string().required("địa chỉ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCreateAccount = async (
    userName,
    password,
    fullname,
    gender,
    provinceId,
    districtId,
    wardId,
    address,
    phoneNumber,
    email
  ) => {
    try {
      await createAccountApi({
        userName,
        password,
        fullname,
        gender,
        provinceId,
        districtId,
        wardId,
        address,
        latitude: 0,
        longitude: 0,
        phoneNumber,
        email,
      });
      Swal.fire({
        icon: "success",
        text: "Tạo tài khoản thành công !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/home");
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

    handleCreateAccount(
      data.username,
      data.password,
      data.fullname,
      data.gender,
      idCity,
      idDistrict,
      idWard,
      data.address,
      data.phoneNumber.toString(),
      data.email
    );

    // var latitude: 0;
    // var longitude: 0;
    // dispatchAction(
    //   createEmployeeAccountActions.createEmployee(
    //     data.username,
    //     data.password,
    //     data.fullname,
    //     data.gender,
    //     idCity,
    //     idDistrict,
    //     idWard,
    //     data.address,
    //     latitude,
    //     longitude,
    //     data.phoneNumber.toString(),
    //     data.email
    //   )
    // );
  };

  return (
    <div>
      <div className="container mr-5">
        <h3 className="">Đăng kí nhân viên</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="col">
                <div className="form-group">
                  <label>UserName</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("username")}
                  />
                  <p>{errors.username?.message}</p>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phoneNumber")}
                  />
                  <p>{errors.phoneNumber?.message}</p>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("password")}
                  />
                  <p>{errors.password?.message}</p>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("cpassword")}
                  />
                  <p>{errors.cpassword?.message}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Fullname</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fullname")}
                />
                <p>{errors.fullname?.message}</p>
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("birthday")}
                />
                <p>{errors.birthday?.message}</p>
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("gender")}
                />
                <p>{errors.gender?.message}</p>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                />
                <p>{errors.email?.message}</p>
              </div>
            </div>
            <div className="">
              <div className="col">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address")}
                  />
                  <p>{errors.address?.message}</p>
                </div>
                <div className="dropdown show mt-5 mr-5">
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {city === "" ? "Thành Phố" : city}
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
                              handleGetWardAndDistric(item.id, item.description)
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
                <div
                  className="dropdown show  mr-5"
                  style={{ marginTop: "55px" }}
                >
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {ward === "" ? "Quận" : ward}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {dataWardAndDistrict ? (
                      dataWardAndDistrict.length > 0 ? (
                        dataWardAndDistrict.map((item, index) => (
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleGetWardAndDistric2(
                                item.id,
                                item.description,
                                idCity,
                                idWard
                              )
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : (
                        <div>Vui lòng chọn Thành Phố</div>
                      )
                    ) : (
                      <div>Vui lòng chọn Thành Phố</div>
                    )}
                  </div>
                </div>
                <div className="dropdown show " style={{ marginTop: "65px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {district === "" ? "Huyện" : district}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {dataWardAndDistrict && ward ? (
                      dataWardAndDistrict.length > 0 ? (
                        dataWardAndDistrict.map((item, index) => (
                          <a
                            className="dropdown-item"
                            onClick={() =>
                              handleGetWardAndDistric3(
                                item.id,
                                item.description
                              )
                            }
                          >
                            {item.description}
                          </a>
                        ))
                      ) : (
                        <div>Vui lòng chọn Quận</div>
                      )
                    ) : (
                      <div>Vui lòng chọn Quận</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-5 mt-3 ml-5">
              <button
                type="submit"
                className="btn btn-warning btn-lg"
                style={{ width: "200px", marginLeft: "350px" }}
              >
                Đăng kí
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
export default withConnect(CreateAccount);
