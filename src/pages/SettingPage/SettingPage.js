import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getSettingsActions from "../../actions/Setting/GetSetting";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateSettingApi } from "../../apis/Setting/UpdateSetting";
import { updateCleaningToolStatusApi } from "../../apis/CleaningTool/UpdateCleaningToolStatus";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const SettingPage = (props) => {
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [idSetting, setIdSetting] = useState("");
  const [settingTime, setSettingTime] = useState([]);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getSettingsActions.getSettings());
  }, []);
  const { dataSetting } = props;
  //xu li time
  var stringTime = [];
  if (dataSetting.length > 0) {
    for (let index = 0; index < dataSetting.length; index++) {
      const element = dataSetting[index];
      if (element.description.includes("(giờ : phút)")) {
        stringTime = JSON.parse(element.data);
      }
    }
  }
  //xu li thay doi va cap nhat time
  const changeTimeForm = (e, index) => {
    stringTime[index].timeFrom = e.target.value;
  };
  const changeTimeTo = (e, index) => {
    stringTime[index].timeTo = e.target.value;
  };

  const handleUpdateTime = (idSettingTime, description) => {
    //Lấy được chuỗi dạng string đã thay đổi đc giá trị cần đổi
    const StringConvertData = JSON.stringify(stringTime);
    handleUpdateSetting(idSettingTime, description, StringConvertData);
  };
  // xu li area
  var stringArea = [];
  if (dataSetting.length > 0) {
    for (let index = 0; index < dataSetting.length; index++) {
      const element = dataSetting[index];
      if (element.description.includes("Tổng vệ sinh")) {
        stringArea = JSON.parse(element.data);
      }
    }
  }
  // xu li thay doi va cap nhat area
  const changeAreaForm = (e, index) => {
    stringArea[index].areaFrom = e.target.value;
  };
  const changeAreaTo = (e, index) => {
    stringArea[index].areaTo = e.target.value;
  };
  const changePrice = (e, index) => {
    stringArea[index].price = e.target.value;
  };
  const changeEsTime = (e, index) => {
    stringArea[index].estimateTime = e.target.value;
  };

  const handleUpdateArea = (idSettingTime, description) => {
    //Lấy được chuỗi dạng string đã thay đổi đc giá trị cần đổi
    const StringConvertData = JSON.stringify(stringArea);
    handleUpdateSetting(idSettingTime, description, StringConvertData);
  };
  //Xu li Hour
  var stringHour = null;
  if (dataSetting.length > 0) {
    for (let index = 0; index < dataSetting.length; index++) {
      const element = dataSetting[index];
      if (element.description.includes("Khung giờ đặt dịch vụ")) {
        stringHour = JSON.parse(element.data);
      }
    }
  }

  // xu li thay doi va cap nhat area
  console.log(stringHour);
  const changeHourMin = (e) => {
    stringHour.minHour = e.target.value;
  };
  const changeHourMax = (e) => {
    stringHour.maxHour = e.target.value;
  };

  // Khung giờ không được đăng ký làm việc
  var stringHourSignUp = null;
  if (dataSetting.length > 0) {
    for (let index = 0; index < dataSetting.length; index++) {
      const element = dataSetting[index];
      if (
        element.description.includes("Khung giờ không được đăng ký làm việc")
      ) {
        stringHourSignUp = JSON.parse(element.data);
      }
    }
  }

  console.log(stringHourSignUp);

  // xu li thay doi va cap nhat area
  const changeHourStart = (e) => {
    stringHourSignUp.start = e.target.value;
  };
  const changeHourEnd = (e) => {
    stringHourSignUp.end = e.target.value;
  };

  const handleUpdateHour = (idSettingTime, description) => {
    //Lấy được chuỗi dạng string đã thay đổi đc giá trị cần đổi
    const StringConvertData = JSON.stringify(stringHour);
    handleUpdateSetting(idSettingTime, description, StringConvertData);
  };

  const handleUpdateHourSignUp = (idSettingTime, description) => {
    //Lấy được chuỗi dạng string đã thay đổi đc giá trị cần đổi
    const StringConvertData = JSON.stringify(stringHourSignUp);
    handleUpdateSetting(idSettingTime, description, StringConvertData);
  };

  const handleUpdateSetting = async (id, description, data) => {
    try {
      console.log(data);
      await updateSettingApi(id, { description, data });
      Swal.fire({
        icon: "success",
        text: "Cập nhật thành công",
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

  const handleActive = (id) => {
    handleUpdateCleaningToolStatus(id);
  };

  const handleUpdateCleaningToolStatus = async (id) => {
    try {
      await updateCleaningToolStatusApi(id);
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

  const handleUpdateImgCleaningTool = async (id, File) => {
    try {
      console.log(dataSetting);
      await updateCleaningToolImgApi(id, { File });
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

  yup.addMethod(yup.string, "stripEmptyString", function () {
    return this.transform((value) => (value === "" ? undefined : value));
  });

  const validationSchema = yup
    .object()
    .shape({
      description: yup
        .string()
        .stripEmptyString("Tên dịch vụ không được để trống")
        .default(description),
      data: yup.string().stripEmptyString("Không được để trống").default(data),
      timeFrom: yup.string(),
      timeTo: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const getItemJsonInString = (data) => {};
  const valueJson = [];

  const handParse = (data) => {
    const itemJSon = JSON.parse(data);

    return itemJSon;
  };

  const submitForm = (data) => {
    handleUpdateSetting(idSetting, data.description, data.data);
  };

  const submitForm2 = (e) => {};

  const handleGetDescription = (description, id, data) => {
    setDescription(description);
    setIdSetting(id);
    setData(data);
  };

  console.log(valueJson.length);
  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <h2>Cài đặt</h2>
      {/* <button onClick={() => handCongChuoi()}></button> */}
      <div className="row m-0">
        {dataSetting ? (
          dataSetting.length > 0 ? (
            dataSetting.map((item, index) =>
              item.description.includes("(giờ : phút)") ? (
                <form onSubmit={submitForm2} className="border-0 ">
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={item.description}
                    />
                    <div className="">
                      <div className="col-1" style={{ marginTop: "15px" }}>
                        <span>Từ</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Đến</span>
                      </div>
                    </div>
                    {handParse(item.data).map((itemTime, index) => (
                      <div
                        className="col-2"
                        style={{
                          borderLeft: "1px solid ",
                          marginLeft: "14px",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          // placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemTime.timeFrom}
                          onChange={(e) => changeTimeForm(e, index)}
                        />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemTime.timeTo}
                          onChange={(e) => changeTimeTo(e, index)}
                        />
                      </div>
                    ))}
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleUpdateTime(item.id, item.description)
                        }
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              ) : item.description.includes("Tổng vệ sinh") ? (
                <form onSubmit={submitForm2} className="border-0 ">
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={item.description}
                    />

                    <div className="">
                      <div className="col-1" style={{ marginTop: "15px" }}>
                        <span>Từ</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Đến</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Tiền</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Khoảng</span>
                      </div>
                    </div>
                    {handParse(item.data).map((itemArea, index) => (
                      <div
                        className="col-2"
                        style={{
                          borderLeft: "1px solid ",
                          marginLeft: "14px",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          // placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemArea.areaFrom}
                          onChange={(e) => changeAreaForm(e, index)}
                        />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemArea.areaTo}
                          onChange={(e) => changeAreaTo(e, index)}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemArea.price}
                          onChange={(e) => changePrice(e, index)}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemArea.estimateTime}
                          onChange={(e) => changeEsTime(e, index)}
                        />
                      </div>
                    ))}
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleUpdateArea(item.id, item.description)
                        }
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              ) : item.description.includes("Khung giờ đặt dịch vụ") ? (
                <form onSubmit={submitForm2} className="border-0 ">
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={item.description}
                    />
                    <div className="">
                      <div className="col-1" style={{ marginTop: "15px" }}>
                        <span>Từ</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Đến</span>
                      </div>
                    </div>
                    <div
                      className="col-2"
                      style={{
                        borderLeft: "1px solid ",
                        marginLeft: "14px",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        // placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={handParse(item.data).minHour}
                        onChange={(e) => changeHourMin(e)}
                      />

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={handParse(item.data).maxHour}
                        onChange={(e) => changeHourMax(e)}
                      />
                    </div>

                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleUpdateHour(item.id, item.description)
                        }
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              ) : item.description.includes(
                  "Khung giờ không được đăng ký làm việc"
                ) ? (
                <form onSubmit={submitForm2} className="border-0 ">
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={item.description}
                    />
                    <div className="">
                      <div className="col-1" style={{ marginTop: "15px" }}>
                        <span>Từ</span>
                      </div>
                      <div className="col-1" style={{ marginTop: "30px" }}>
                        <span>Đến</span>
                      </div>
                    </div>
                    <div
                      className="col-2"
                      style={{
                        borderLeft: "1px solid ",
                        marginLeft: "14px",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        // placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={handParse(item.data).start}
                        onChange={(e) => changeHourStart(e)}
                      />

                      <input
                        type="text"
                        className="form-control"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={handParse(item.data).end}
                        onChange={(e) => changeHourEnd(e)}
                      />
                    </div>

                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() =>
                          handleUpdateHourSignUp(item.id, item.description)
                        }
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="input-group mb-3 col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={item.description}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={item.data}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="submit"
                      onClick={() =>
                        handleGetDescription(
                          item.description,
                          item.id,
                          item.data
                        )
                      }
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever="yah"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              )
            )
          ) : null
        ) : (
          <p>Không có dữ liệu</p>
        )}
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
                Cập nhật dịch vụ tên
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
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Mô tả
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("description")}
                    defaultValue={description}
                  />
                  <p>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Dữ liệu:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("data")}
                    defaultValue={data}
                  />
                  <p>{errors.data?.message}</p>
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
  dataSetting: state.getSetting.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(SettingPage));
