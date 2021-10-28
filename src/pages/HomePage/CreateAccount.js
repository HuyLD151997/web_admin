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
import * as getWardsAndDistrics2 from "../../actions/Employees/GetWardAndDistric2";
import { parse, isDate } from "date-fns";
import Geocode from "react-geocode";
const CreateAccount = (props) => {
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [idCity, setIDCity] = useState(-1);
  const [idWard, setIDWard] = useState(-1);
  const [idDistrict, setIDDistrict] = useState(-1);
  Geocode.setApiKey("AIzaSyCU3bQqWU1d28T35Ngk3y_FaOero8_HDbI"); //Insert your Google Maps API here
  Geocode.enableDebug();

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getProvinceActions.getProvinces());
  }, []);
  const { data, dataWardAndDistrict, dataWardAndDistrict2 } = props;
  const handleGetWardAndDistric = (id, city) => {
    setCity(city);
    setIDCity(id);
    dispatchAction(getWardsAndDistrics.getWardsAndDistrics(id));
    setWard("");
    setDistrict("");
  };
  const handleGetWardAndDistric2 = (id, ward) => {
    setWard(ward);
    setIDWard(id);
    dispatchAction(getWardsAndDistrics2.getWardsAndDistrics2(id));

    setDistrict("");
  };
  const handleGetWardAndDistric3 = (id, district) => {
    setDistrict(district);
    setIDDistrict(id);
    // setLong(3);
    // setLat(2);
    console.log(city);
    console.log(ward);
    console.log(district);
  };

  const parseDateString = (value, originalValue) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "dd-MM-yyyy", new Date());

    return parsedDate;
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
      // birthday: yup
      //   .date()
      //   .transform(parseDateString)
      //   .max(today)
      //   .required("Ngày sinh không được để trống"),
      gender: yup
        .string()
        .required("Giới tính không được để trống")
        .matches(/(nam|nữ)/, "Phải điền đúng nam hoặc nữ"),
      email: yup
        .string()
        .email("email không hợp lệ")
        .required("Email không được để trống"),
      address: yup.string().required("địa chỉ không được để trống"),
      AvatarFile: yup.mixed().required("File is required"),
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
    UserName,
    Password,
    Fullname,
    Gender,
    ProvinceId,
    DistrictId,
    WardId,
    Address,
    Latitude,
    Longitude,
    PhoneNumber,
    Email,
    AvatarFile
  ) => {
    try {
      await createAccountApi({
        UserName,
        Password,
        Fullname,
        Gender,
        // Birthday: "",
        ProvinceId,
        DistrictId,
        WardId,
        Address,
        Latitude,
        Longitude,
        PhoneNumber,
        Email,
        AvatarFile,
        //File,
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
    var x = 0;
    var y = 0;
    var address = `${data.address}, ${district}, ${ward}, ${city}, Việt Nam`;

    Geocode.fromAddress(address).then((response) => {
      x = response.results[0].geometry.location.lat;
      y = response.results[0].geometry.location.lng;
      handleCreateAccount(
        data.username,
        data.password,
        data.fullname,
        data.gender,
        idCity,
        idWard,
        idDistrict,
        data.address,
        x,
        y,
        data.phoneNumber.toString(),
        data.email,
        //data.file
        data.AvatarFile
      );
    });

    console.log(idWard);

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
                <div className="form-group">
                  <input
                    type="file"
                    // className="form-control"
                    {...register("AvatarFile")}
                  />
                  <p>{errors.AvatarFile?.message}</p>
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
                {/* <label>Gender</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("gender")}
                /> */}
                <div class="input-group mt-5">
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("gender")}
                  >
                    <option selected>Giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
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
              {/* <div className="form-group">
                <label>Sinh nhật</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("birthday")}
                />
                <p>{errors.birthday?.message}</p>
              </div> */}
            </div>
            <div className="form-group">
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
                <div className="dropdown show" style={{ marginTop: "55px" }}>
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
                <div className="dropdown show " style={{ marginTop: "65px" }}>
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ paddingLeft: "115px", paddingRight: "115px" }}
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
                                item.description
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
                    style={{ paddingLeft: "115px", paddingRight: "115px" }}
                  >
                    {district === "" ? "Huyện" : district}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {dataWardAndDistrict2 && ward ? (
                      dataWardAndDistrict2.length > 0 ? (
                        dataWardAndDistrict2.map((item, index) => (
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
  dataWardAndDistrict2: state.getWardsAndDistrics2.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(CreateAccount);
