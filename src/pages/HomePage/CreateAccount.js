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
  Geocode.setApiKey("AIzaSyBjnyL2BSaV2tCT8PGFZZmKkZQXqCDBSPs"); //Insert your Google Maps API here
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

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup
    .object({
      username: yup.string().required("T??n t??i kho???n kh??ng ???????c ????? tr???ng"),
      // phoneNumber: yup
      //   .number()
      //   .typeError("S??? ??i???n tho???i ph???i l?? s???")
      //   .required("S??? ??t kh??ng ???????c ????? tr???ng"),
      phoneNumber: yup
        .string()
        .required("S??? ??i???n tho???i kh??ng ???????c ????? tr???ng")
        .matches(phoneRegExp, "S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng"),
      password: yup
        .string()
        .min(6, "M???t kh???u ph???i l???n h??n ho???c b???ng 6 k?? t???")
        .required("M???t kh???u kh??ng ???????c ????? tr???ng"),
      cpassword: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "M???t kh???u x??c nh???n ph???i tr??ng v???i M???t kh???u"
        )
        .required("M???t kh???u x??c nh???n kh??ng ???????c ????? tr???ng"),
      fullname: yup.string().required("H??? v?? t??n kh??ng ???????c ????? tr???ng"),
      // birthday: yup
      //   .date()
      //   .transform(parseDateString)
      //   .max(today)
      //   .required("Ng??y sinh kh??ng ???????c ????? tr???ng"),
      gender: yup
        .string()
        .required("Gi???i t??nh kh??ng ???????c ????? tr???ng")
        .matches(/(nam|n???)/, "Ph???i ch???n nam ho???c n???"),
      email: yup
        .string()
        .email("Email kh??ng h???p l???")
        .required("Email kh??ng ???????c ????? tr???ng"),
      address: yup.string().required("?????a ch??? kh??ng ???????c ????? tr???ng"),
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
        text: "T???o t??i kho???n th??nh c??ng !",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log("hello");
      window.location.replace("/home");
    } catch (er) {
      console.log(er);
      Swal.fire({
        icon: "error",
        text: "active fail",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const submitForm = (data) => {
    var x = 0;
    var y = 0;
    var address = `${data.address}, ${district}, ${ward}, ${city}, Vi???t Nam`;

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
        <h3 className="">????ng ki?? nh??n vi??n</h3>
        <div className=" border border-warning p-4">
          <form className="border-0 row" onSubmit={handleSubmit(submitForm)}>
            <div className="">
              <div className="col">
                <div className="form-group">
                  <label>T??n t??i kho???n</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("username")}
                  />
                  <p className="text-danger">{errors.username?.message}</p>
                </div>
                <div className="form-group">
                  <label>S??? ??i???n tho???i</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 0123456789"
                    {...register("phoneNumber")}
                  />
                  <p className="text-danger">{errors.phoneNumber?.message}</p>
                </div>

                <div className="form-group">
                  <label>M???t kh???u</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>
                <div className="form-group">
                  <label>Nh???p l???i m???t kh???u</label>
                  <input
                    type="password"
                    className="form-control"
                    {...register("cpassword")}
                  />
                  <p className="text-danger">{errors.cpassword?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    // className="form-control"
                    {...register("AvatarFile")}
                  />
                  <p className="text-danger">{errors.AvatarFile?.message}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>H??? v?? t??n</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fullname")}
                />
                <p className="text-danger">{errors.fullname?.message}</p>
              </div>

              <div className="form-group">
                <div class="input-group" style={{ marginTop: "56px" }}>
                  <select
                    class="custom-select"
                    id="inputGroupSelect01"
                    {...register("gender")}
                  >
                    <option selected>Gi???i t??nh</option>
                    <option value="nam">Nam</option>
                    <option value="n???">N???</option>
                  </select>
                </div>
                <p className="text-danger">{errors.gender?.message}</p>
              </div>
              <div className="form-group mt-4">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              {/* <div className="form-group">
                <label>Sinh nh???t</label>
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
                  <label>?????a ch???</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address")}
                  />
                  <p className="text-danger">{errors.address?.message}</p>
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
                    // style={{ paddingLeft: "95px", paddingRight: "95px" }}
                  >
                    {city === "" ? "Th??nh Ph???" : city}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
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
                            style={{ marginTop: "10px" }}
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
                    // style={{ paddingLeft: "115px", paddingRight: "115px" }}
                  >
                    {ward === "" ? "Qu???n" : ward}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
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
                        <div>Vui l??ng ch???n Th??nh Ph???</div>
                      )
                    ) : (
                      <div>Vui l??ng ch???n Th??nh Ph???</div>
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
                    // style={{ paddingLeft: "115px", paddingRight: "115px" }}
                  >
                    {district === "" ? "Huy???n" : district}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    style={{ marginTop: "100px" }}
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
                        <div>Vui l??ng ch???n Qu???n</div>
                      )
                    ) : (
                      <div>Vui l??ng ch???n Qu???n</div>
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
                ????ng ki??
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
