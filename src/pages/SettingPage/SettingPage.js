import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getSettingsActions from "../../actions/Setting/GetSetting";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateCleaningToolApi } from "../../apis/CleaningTool/UpdateCleaningTool";
import { updateCleaningToolStatusApi } from "../../apis/CleaningTool/UpdateCleaningToolStatus";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const SettingPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getSettingsActions.getSettings());
  }, []);
  const { data } = props;

  console.log(data);

  const handleUpdateServiceName = async (id, description, quantity) => {
    try {
      console.log(data);
      await updateCleaningToolApi(id, { description, quantity });
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
      console.log(data);
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
      quantity: yup
        .number()
        .typeError("Số lượng phải là số")
        .required("Số lượng không được để trống"),
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
  const getItemJsonInString = (data) => {};
  const valueJson = [];
  const handParse = (data) => {
    var itemJSon = JSON.parse(data);
    for (let index = 0; index < itemJSon.length; index++) {
      valueJson.push(itemJSon[index]);
    }
  };

  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <div>
                <button className="col" onClick={() => handParse(item.data)}>
                  {item.data}
                </button>
                {valueJson.length > 0
                  ? valueJson.map((itemJs, index) => <p>{itemJs}</p>)
                  : null}
              </div>
            ))
          ) : null
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getSetting.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(SettingPage));
