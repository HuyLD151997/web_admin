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

  console.log(dataSetting);

  const handleUpdateSetting = async (id, description, data) => {
    try {
      console.log(data);
      await updateSettingApi(id, { description, data });
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

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
      data: yup.string().required("Không được để trống"),
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

  const handCongChuoi = (data) => {
    const itemJSon = JSON.parse(data);
    const str = "[";
    for (let i = 0; i < itemJSon.length; i++) {
      const index = itemJSon[i];
      if (index == itemJSon.length - 1) {
        str += "]";
      } else {
        str += ",";
      }
    }
    const strNew =
      '[{"timeFrom": ' + data.timeFrom + '"timeTo": ' + data.timeTo;
    return itemJSon;
    console.log(itemJSon);
  };

  console.log(settingTime);

  const submitForm = (data) => {
    handleUpdateSetting(idSetting, data.description, data.data);
  };

  const submitForm2 = (e) => {
    console.log("form 2");
  };

  const handleGetDescription = (description, id, data) => {
    setDescription(description);
    setIdSetting(id);
    setData(data);
  };

  const chaneTimeForm = (e, index) => {
    console.log(e.target.value);
    console.log(index);
  };

  console.log(valueJson.length);
  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <h2>Cài đặt</h2>
      <div className="row m-0">
        {dataSetting ? (
          dataSetting.length > 0 ? (
            dataSetting.map((item, index) =>
              item.description.includes("(giờ : phút)") ? (
                <form onSubmit={submitForm2} className="border-0 col-12">
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={item.description}
                    />

                    {handParse(item.data).map((itemTime, index) => (
                      <div className="col-2">
                        <input
                          type="text"
                          className="form-control"
                          // placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemTime.timeFrom}
                          onChange={(e) => chaneTimeForm(e, index)}
                        />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Recipient's username"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          defaultValue={itemTime.timeTo}
                        />
                      </div>
                    ))}
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(submitForm)}
                  className="border-0 col-12"
                >
                  <div className="input-group mb-3 col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      defaultValue={item.description}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      defaultValue={item.data}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        // onClick={() =>
                        //   handleGetDescription(
                        //     item.description,
                        //     item.id,
                        //     item.data
                        //   )
                        // }
                        // data-toggle="modal"
                        // data-target="#exampleModal"
                        // data-whatever="yah"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </form>
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
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Mô tả:{description}
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
                  <label htmlFor="recipient-name" className="col-form-label">
                    Dữ liệu:{data}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    {...register("data")}
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
