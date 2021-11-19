import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getRequestCleaningToolPendingActions from "../../actions/RequestCleaningTool/GetRequestCleaningToolPending";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCleaningToolApi } from "../../apis/CleaningTool/DeleteCleaningTool";
import { updateCleaningToolApi } from "../../apis/CleaningTool/UpdateCleaningTool";
import { updateCleaningToolImgApi } from "../../apis/CleaningTool/UpdateCleaningToolImg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";

const CleaningToolNotAcceptPage = (props) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [idService, setIdService] = useState("");
  const [selectedImages, setSelectedImage] = useState([]);
  const [imgSelect, setImgSelect] = useState("");
  const [imgSelect2, setImgSelect2] = useState(null);
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(
      getRequestCleaningToolPendingActions.getRequestCleaningToolPending()
    );
  }, []);
  const { data } = props;

  console.log("hi" + data);

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCleaningToolApi(id);
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

  const handleGetAndUpdateImg = (id) => {
    setImgSelect(id);
  };

  const submitForm2 = (e) => {
    // console.log(imgSelect2);
    handleUpdateImgCleaningTool(imgSelect, imgSelect2);
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

  const handleGetDescription = (description, id, quantity) => {
    setDescription(description);
    setIdService(id);
    setQuantity(quantity);
  };

  const submitForm = (data) => {
    handleUpdateServiceName(idService, data.description, data.quantity);
  };

  const handleChangeFile = (e) => {
    if (e.target.files) {
      setImgSelect2(e.target.files[0]);

      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (src) => {
    return src.map((photo) => {
      return (
        <img
          style={{
            width: "50px",
            height: "50px",
            // borderRadius: "50%",
            marginRight: "5px",
            marginBottom: "5px",
          }}
          src={photo}
          key={photo}
        />
      );
    });
  };
  return (
    <div className="container ml-2 table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Thông tin dụng cụ xin cấp phát</h2>
      </div>
      <table className="table align-middle mt-2">
        <thead className="table-light">
          <tr>
            <th scope="col">Hình</th>
            <th scope="col">Dụng cụ</th>
            <th scope="col">Nhân viên</th>
            <th scope="col">Lý do xin cấp phát</th>
            <th scope="col">Ngày/Giờ yêu cầu</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className=" align-middle">Hình</td>
            <td className="align-middle">Tên Dụng cụ</td>
            <td className="align-middle">Tên nhân viên</td>
            <td className=" align-middle">Dùng hết</td>
            <td className=" align-middle">Ngày/Giờ yêu cầu</td>
            <td className=" align-middle">Chưa cấp phát</td>
            <td className=" align-middle ">
              <span className="btn btn-warning mr-2">
                <i class="fa fa-times-circle mr-1"></i>
                Từ chối
              </span>
              <span className="btn btn-outline-primary">
                <i class="fa fa-check-circle mr-1"></i>Cấp phát
              </span>
            </td>
          </tr>
        </tbody>
      </table>

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
                    Số lượng:{quantity}
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="recipient-name"
                    {...register("quantity")}
                  />
                  <p>{errors.quantity?.message}</p>
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
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="exampleModalLabel2">
                Cập nhật hình
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
            {/* onSubmit={handleSubmit(submitForm2)} */}
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    name="img-upload"
                    onChange={handleChangeFile}
                  />

                  <div className="label-holder">
                    <label htmlFor="file" className="img-upload">
                      Chọn hình
                    </label>
                  </div>
                  <div className="result">{renderPhotos(selectedImages)}</div>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitForm2}
                >
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
  data: state.getRequestCleaningToolPending.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(CleaningToolNotAcceptPage));
