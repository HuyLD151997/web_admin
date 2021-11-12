import { useDispatch, connect } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import * as getBookingDetail from "../../actions/Booking/GetBookingDetail";
import { NavLink, Link, useParams } from "react-router-dom";
import * as moment from "moment";
import Swal from "sweetalert2";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as getServiceGroupsAction from "../../actions/ServicesGroup/GetServiceGroups";

const GetBooking = (props) => {
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getBookingDetail.getBookingDetail(id));
  }, []);
  const { data, dataSerGroup } = props;

  console.log(data);

  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
      unitPrice: yup.string().required("Giá tiền dịch vụ không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div>
      {data ? (
        <div className="container">
          <div className="row m-0">
            <h2>Thông tin đặt lịch</h2>
            <Link
              type="button"
              to="/booking-log"
              className="btn btn-warning btn-lg ml-auto mr-3"
            >
              Nhật ký làm việc
            </Link>
          </div>
          <div className="row">
            <div className="col-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Diện tích dọn dẹp: {data.totalCleaningArea}
                </li>
                <li className="list-group-item">
                  Tổng chi phí: {data.totalPrice} VND
                </li>
                <li className="list-group-item">
                  Trạng thái công việc:
                  {data.bookingStatus !== null ? (
                    <span> {data.bookingStatus.description}</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Ghi chú:
                  {data.description !== null ? (
                    <span>{data.description}</span>
                  ) : (
                    <span> Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  <span
                    className={
                      data.isDisable === true
                        ? "rounded p-1 border border-danger text-danger"
                        : "rounded p-1 border border-success text-success"
                    }
                    //onClick={this.onUpdateStatus}
                  >
                    {" "}
                    {data.isDisable === true
                      ? "Đặt lịch đã hủy"
                      : "Đặt lịch đang hoạt động"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Ngày/ Giờ bắt đầu: &nbsp;
                  {moment(data.dateBegin).format("DD/MM/YYYY")}
                  &nbsp;/ {data.dateBegin.substring(11, 16)}
                </li>
                <li className="list-group-item">
                  Ngày/ Giờ bắt đầu: &nbsp;
                  {data.dateEnd ? (
                    <div>
                      {moment(data.dateEnd).format("DD/MM/YYYY")}
                      &nbsp;/ {data.dateEnd.substring(11, 16)}
                    </div>
                  ) : (
                    <span>Chưa hoàn thành</span>
                  )}
                </li>
                {/* <li className="list-group-item">
                      Địa chỉ: {item.address}, &nbsp;
                      {item.ward.description}, &nbsp;
                      {item.district.description}, &nbsp;
                      {item.province.description}.
                    </li> */}
                <li className="list-group-item">
                  Ngày tạo / giờ tạo:&nbsp;
                  {moment(data.dateCreated).format("DD/MM/YYYY")}
                  &nbsp;/ {data.dateCreated.substring(11, 16)}
                </li>
                <li className="list-group-item">
                  Ngày cập nhật / giờ cập nhật:&nbsp;
                  {moment(data.dateUpdated).format("DD/MM/YYYY")}
                  &nbsp;/ {data.dateUpdated.substring(11, 16)}
                </li>
                <li className="list-group-item">
                  Địa chỉ dọn dẹp:{" "}
                  {data.address !== null ? (
                    <span>{data.address}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                  {data.ward !== null ? (
                    <span>, &nbsp;{data.ward.description}</span>
                  ) : (
                    <span></span>
                  )}
                  {data.district !== null ? (
                    <span>, &nbsp;{data.district.description}</span>
                  ) : (
                    <span></span>
                  )}
                  {data.province !== null ? (
                    <span>, &nbsp;{data.province.description}</span>
                  ) : (
                    <span></span>
                  )}
                  .
                </li>
              </ul>
            </div>
          </div>
          <h3>Thông tin dịch vụ</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Dịch vụ</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thời gian dự tính</th>
                <th scope="col">Đơn giá</th>
              </tr>
            </thead>

            <tbody>
              {data.serviceBookings.map((smallItem, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{smallItem.service.description}</td>
                  <td>{smallItem.quantity}</td>
                  <td>{smallItem.service.estiamtedMinutes}</td>
                  <td>{smallItem.service.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Thông tin khách hàng</h3>
          <div className="row">
            <div className="col-4">
              {data.customer.hasAvatar ? (
                <img
                  src={`http://api.beclean.store/api/Account/Avatar/${data.customer.hasAvatar}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                  }}
                />
              ) : (
                <img
                  src="data:image/jpeg;base64,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"
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                  }}
                />
              )}
            </div>
            <div className="col-8">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Họ và tên:&nbsp;
                  {data.customer.fullname ? (
                    <span>{data.customer.fullname}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Số điện thoại:&nbsp;
                  {data.customer.phoneNumber ? (
                    <span>{data.customer.phoneNumber}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Email:&nbsp;
                  {data.customer.email ? (
                    <span>{data.customer.email}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
                <li className="list-group-item">
                  Giới tính:&nbsp;
                  {data.customer.gender ? (
                    <span>{data.customer.gender}</span>
                  ) : (
                    <span>Chưa có dữ liệu</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <h3>Thông tin nhân viên</h3>
          {data.employee ? (
            <div className="row">
              <div className="col-4">
                {data.employee.hasAvatar ? (
                  <img
                    src={`http://api.beclean.store/api/Account/Avatar/${data.employee.hasAvatar}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                    }}
                  />
                ) : (
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ8NDQ0NDQ0ODw0NDg0ODQ8NDRAPFREWFhcRGRUYHC0hGBolGxMTITEhJSkrLi4uFyA1ODMsNyktLisBCgoKDg0OGhAQFS0lHyUwLS0vLS0tKystLS0tLjcuLSstLSstLS0yLS0tKystLS0rLS0tLSstLy0tMS0rLTcwLf/AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAAAwQBBwIGCAX/xAA9EAACAgECAgYGBgkFAQAAAAAAAQIDBAURBhIHEyExUZEiQWFxgaEUIzJSYrEkQnKCkqKys8EIM0N04SX/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAbEQEBAQACAwAAAAAAAAAAAAAAAREhMQJBUf/aAAwDAQACEQMRAD8A1SYAAAAAAAAAAAAAAABkwZQGTKMGUBlHJHFHJAc4nNHCJzQEkSWJFEliBNAngQQJ4ATwLMCtAswAs1FusqVFqsDXQAAAAAAAAAAAAAAdj4T4K1DV3vjVctCbUsm3eNKa70n3yfsXyA64ZRvrQuhvTqUpZll2ZZst483U0J+yMe3zkztVHA2jVpRjpmHsvvUxm/N9rA8tnJHqSfBWjtbPTMLb2UQX5I+TndFmiXJ7YsqH2+lRbOG3wba+QHnJHJG19c6FrYRc9Py+u27qclRhN+6cVt8jWmqaXk4VroyqLKLF+rOLSa8YvukvagK0TmjhE5oCSJLEiiSxAmgTwIIE0ALECzWVqyzWBZrLVRVrLVYGugAAMmAAQBkDAAAHZOCODsnWb3CpqqivZ3ZElvGG/dFL9aT8PP29bbPUHRxoiwNJxaeXaydcb7vF22Lme/u3S+AHyNI6I9Gx0utrtzJrbeV9j5W/2IbI7zi4tdMI1VQjXXBKMYQioxil6kkTAAAAAAAw0fL4h4fxdSolj5danB78sl2WQl96MvUz6oA8wcZcKZGkZLqs3nTPd0ZG20Zx8H4SXrXxPhI9O8a8OVaphWY00lZs50Weuu5L0X7vU/YzzLbVKucq5xcZwlKE4vvUovZrzQGYksSKJLECaBNAhgTQAsVlmsrVlmsCzWWqirWWqwNdAAAAAAMmAAAAnwKusvpr236y6mvbx5ppbfM9fVRSSS7Ekkl7EeTuF4c+pYMe7fMxP7sT1lEDkAAAAAAAAAAMNHnrpd0lYur2TitoZUIZK8Od+jP5x3/ePQxqDp7x1+gXevfIq+Hoy/wwNTRJYkUSWIE0CaBDAmgBYgWKyvAsVgWqy1WVay1WBroAAAAAAAAAAfX4Rf8A9TA/7mL/AHYnrBHkfQZ8udhy+7l4j8ronriIGQAAAAAAAAABiTPPXSTxotWshTVS6qMayzllNp2Tn9ltpdiXZ3HoK57Rb8E38jyVdLmsnLxnN+cmBmJLEiiSxAmgTQIIE8ALECxWVoFmAFqstVlWstVga6AAAAAAAAAAE+FPluql3cttUvKaZ6+re/b47M0R0YdHOPqeLLOzJ2xg7ZQohVJQfoPaUm2vvJr4G9647JLwSXb3gcwAAAAAAAAABU1Szkx7p/cptl5QbPJsHuetc7FjfVZTPfktrnVPZ7PllFxez9zPP/SVwZXo91Lx5znj3qfL1mzlCcdt47pdq2afmB0+JLEiiSxAlgTwIIE8AJ4FmsrwLFYFqstVlWstVga6AAAAAAAAAAHoLoLy42aP1KfpY+RfCS/bl1i/rNjGj+gDU+XIzMNv/drhkQ/ag+WXylHyN4IAAAAAAAAAAABp7p6zFzYON60rr37ntFflLyNwM869LOo/SdavSe8ceNeNHw3jHml/NOXkB1KJLEiiSxAlgTwIIE8AJ4FmsrQLNYFmst1FWstVAa6AAAAIADJgAAAPs8Ha29N1HGzPScKptWxj3yqlFxkvb2Pf3pHpvQNfw9SqduHfG+uMuSTjunGWyfK0+57NHks25/p+1NRuzMJvZ2QryYLxcHyS+UoeQG7AAAAAAAAAAB1/i3izE0qnnyJ/WzhN0UpNztlFdy8Fu1u2eZ775W2Ttm952TnZN+MpNt/NnfOnDUOt1WFCe8cbHri0vVObcn/LyGv0BJEliRRJYgSwJ4EECeAE8CzWV4FisC1WWqipWW6gNdmDJgAAAAAAAAAfc4J1t6bqeNl/qQnyXLxpmuWXlun+6fDAHsauaklKLTTSaa7U0+5nI1l0IcS25eJZhXJylgqtV2t7uVMt+WD9seVrfw2NmgAAAAAA4XWxrhKc2owhGU5SfYlFLdvyRzNedNetWYumqirdPNm6Jz+7Wo80o/vd3u3A0pxHqbzs7Jy3/wA905x9kF6MV/ColFHBHNASRJYkUSSIE0CeBBEngBPAswK1ZYgBaqLdRUqLdQGuzAAAAAGAAAAQAAAbn/09U/V6hZ42Y1flGbf9SNwmtugfD6vSZ2tP6/Ktmt/CCjX+cWbJAAAAAABrDp7p30/Gn9zKS/irmv8ABs86R0xYju0S9pbumdN/wjNKXybCV53RzRwRzQVJEliRRJIgTRJ4EESeAE8CxWV4FisC1UWqyrWWqwNdgAAAAAAAAGQMDbw7W+xJd7ZlLdpLtb2SS7W34G0+i/o4vtvq1DUK5U0VSVlOPNbWWzX2ZSi+2MU+3Z7NtL1d5LW1uBtMlhaVhY048tlePX1q8LZLmn/NJn3jCMhQAAAAAKGuYCysTIxn3X021fxQaL5hgryJdTKqcq5radcpQmvCUXs15oI270odHdtts9R0+HPKfpZGNH7bkl22Q8d13x8jUkoSjJxlGUZRe0oyTjJPwafcElcokkSOJJEKmiTwIIk0ALECxWV4FisC1WWqyrWWqwNdgAAAAAG53DhLo51LU+Wzk+i4rfbfemnJfgh3y+Oy9oS3HT1+fYved24W6MtT1FKycPoWO9mrchNTkvw19/nsbh4T6O9N0zlnGr6Rkrvyb0pT3/DHuh8DuCQOa6lwp0fabpfLOurrslJb5N3p2b+txXdD4HbUjIBgAAoAAAAAAADDR13ibgzT9TX6RSlbttHIr9C6PxX2vc9zsYCWNA8S9F+fhc1mP+m0Lt9BbXxXth6/3d/cdK5XFuMk4yT2cWtmn4Neo9ZNHW+I+C9P1JOV1Kjdtssiv0LV72vtfEJzHnaJNA7bxJ0c52DzWVL6Xjr9atfWxX4of5W51OPz8PWFllTwLFZXgWKwq1WWqyrWWqwNdgAAfa4X4WztVt6vEq3jFrrL5twprTfrlt2v2LdnY+jjo8s1WSycnmqwIy23Xo2XtPtjHwj4y8jf+madRi0xox6oU1QW0IQioxSDO706Zwd0X6fp/LbfFZuUtpdZbFdVB/gg+xe97s76o7GTIWQAAUAAAAAAAAAAAAAAAAAAHFxOq8T8CYWob2cvUZD/AOapJcz/ABLul+Z2wBLNeeuIeFsvTZfXxUqm9o317ut+x/dfsZ8ys9I5ONC2DrshGcJLaUZJOLXhsam444JeG5ZOJFyxt951rtlT7fbH8ipuduo1lqsq1lqsjTXZ2HgThqerZ9eOk+oi1ZkzW+0al3rf1OXcv/Drxv8A6DtMhTpf0jZKzJtnKUvW4QbjFe7sfmWM+V9Ng4WLXTXCqqEa664qEIRW0YxS2SSLBjdDdEajIMboboDIMboboDIMboboDIMboboDIMboboDIMboboDIMboboDIMboboDIMbjcDIMbobgZI7a1KLjJJpppp9qa8DnuNwXlpDjDQ/oGZKEVtTZvZT4KO/bD4P80fLrNodKGArMKNy+1RYn74y9Fr8vI1dUWs+Px//Z"
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                    }}
                  />
                )}
              </div>
              <div className="col-8">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Họ và tên:&nbsp;
                    {data.employee.fullname ? (
                      <span>{data.employee.fullname}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Số điện thoại:&nbsp;
                    {data.employee.phoneNumber ? (
                      <span>{data.employee.phoneNumber}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Email:&nbsp;
                    {data.employee.email ? (
                      <span>{data.employee.email}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                  <li className="list-group-item">
                    Giới tính:&nbsp;
                    {data.employee.gender ? (
                      <span>{data.employee.gender}</span>
                    ) : (
                      <span>Chưa có dữ liệu</span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <span>Chưa tìm được nhân viên phù hợp</span>
            </div>
          )}

          <div className="row">
            <div className="col-6">
              <div>
                <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                  Hình ảnh trước khi dọn dẹp
                </span>
              </div>
              <div
                id="carouselExampleControls"
                className="carousel slide z-depth-1-half"
                data-ride="carousel"
                data-interval="false"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="d-block"
                      src="data:image/jpeg;base64,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"
                      alt="First slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block"
                      src="data:image/jpeg;base64,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"
                      alt="Second slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGBgaGh8eHBocHBwaHx4hHB4cGR4hHiEcJC4nHh4rISEcJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHjQrISs0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxMf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAEQQAAIBAgQDBQUGAwcDAwUAAAECEQAhAwQSMQVBUSJhcYGRMqGxwfAGE0JS0eEUcpIjYoKywtLxFSQzFkPTU2ODk6L/xAAYAQEBAQEBAAAAAAAAAAAAAAABAAIDBP/EACIRAQEBAAIDAAEFAQAAAAAAAAABEQIhEjFBUSJCYXGBA//aAAwDAQACEQMRAD8AzKC1T4dVqcSSLSYMbc6fg8SDGEUkidzG0e+49a55S0GXqi+1mQAIxhs0K3cRMHzFv8NQL9qoB04fqf0rua44+Nh6WVAjAE7kiLzM7gimSwKQpseuxovhp7ZHXDf/ACE1Mh9tGiI1DxkT7y3pQmTVlxFB5hx0mU5evxqKRhHL5UzEe09fqKP+71Nh8/7Mfp8/dQ+ZwFV9KgTI1WG8GfewgVGwZxjE/wCwTvdR6Fz8qx9avjPayKn8uMfjiLWZwlUhizEEDsjTOoyLEz2bSZvtWp6CKKVdNcrQX/FP/Dlbfhf/ADIapyKuOKH+xy38j/FKqSKIkYWrX7M4kZrD7yR6j9QKrTRnBDGZwT/9xfjFSeh4ZnAU97f66jxRdD4j4H9amySzg6fysfTtiuYidnwIPxHzrDRqHtUXkWu3l86FG9EZI+15fOgDFe9GYT2qvDXorDNITs1Nw2u319bUxmpmXazeP60IsRqFc1PiUO1SVXGzGE56wPUgVgsW7GI+rVu+O4TPh6VE3v4CfW8VkcbhzcxHXcd/SqXK1nRMIwx5eV5oL2mnqfmBR7q2nTG1uR28D3VCmCQQPiD8xVOjyu4veFYdifrrR7JUXDcOEHff5UWVojND6KVS6TXakx2El8Qfyn3x/qonhI/tlB2a8eAv8q7iYMYzJIBbDG+0gKb+a1JlcvpdG+8w7MbBpJBBEDnN63ovtSYiaXK95X0NFYRjD22B/wA9HcT4aDiuRjYa9smC1xeb9DEV1cBIIONhCWJPbECb2G/X1q2JwxKNyJ0nwaVPxY0lwzrQmxDqCPGV/wAxPuqbCyaMhw/4jDaBMgzAFp37/fU7YKTP3yGWkwDvYk/1CfdQT8rhwwJ2VBPkJ/1D0quQy+s8yT5TqX/+VFWxx8EB1OOgLDobbj9Om1B/c5eQf4pYgCNDHbe89NQ86jUeZM8PbuxD/nj51lZrZ8TwsMZF/umDoHBkBhB1JI7V95PnWMrXFkq5XaVaS84p/wCLLfyv8UqrIqy4j/48v/K/+igNDclJ8iaJ6RkVNw1tOPhE7DET/MKYcFhurf0moX7t/hSnqOQaDp6ll9SfnU4Wx8KrMpmAyo67OA/gTBYeRq2J58jf1vXNoL0NTZXZvGh8E2I6Gp8sbHxPyo+gQDeiUNBKaKQ1UJWe1Ny/s+Z+Aprm1dy/sDz+MVEmqBqleo2qCBqFbAXoKMYVEwvQ0BxMih5D0B+NCvwhP+KtiK4RVgDYWGFAHIU4rUsU2KfSR6a5UumuVama42kZhD+ZCPcw+dU+UVQ6MALOp2GxI+G9aP7RpDYLdH0+8fvWexjpdu64jlB7Q8iG/pFagGcYw0GO04ZdmhpDlbaEtbvm/fXEMDs4AH8zOfneiOO/+dbwGw1gm8dplO/SxquTNPtpmOYVYq7wxLhYD6sRiBBw3WF/lkQPEChFwu5j/hP61ZZF3fERSkA6hNh7SsuwN9+lFtwV+RBte4/3VacUS4ag9oPtaBE3mpiE5K/r+lWDcOdHUa9OqQSJMW1XE91LN5NxBGISCYvqEehvz9KtCXBdRkcUGQJYQep0Rv3xWRANa3JO6ZbE1Agh3gm34QQRPhvVSvEsz+F38kU/BaYFSEb8p9DUuXwm1jstv0NWn8dmzzxf6D8lp+E+aaZOILWlGuemwjxp2pZfwrOiAWgc7bxU2Fw9x09/6VVxmure8fOnf91+b1eP9dZ7DS5RsZR7YHmaqftJlHxFUlhIPfz+hQP/AHPVT/8AkH/yVFipmDuqf/sX54hpS2+zQbQMHdgSV8N/nWjx8YYa9q8WHf08r+lYTDwMdSCHCHqrrPuY1zM4WM5BfF1kWEtMAmTy6k0ZGta3J4upmPX9qLy7dnzNYnIZp8BpLKybFZvc7i2//FajJZiQB4/GizEtUNFIaBwzRaGhJH2qTD9lfD43qJ9qnFo8KkYxqI1K1RtUkTVE4qZqjYVJHSinRSipGRSinxS01JHFKpIpVJSfa1IwdX5cQH1n9aos5iL943YXcndvxdo8+cn1rV/afB1ZfF7gD6R+lY3iWIQMNlga1EmAdlUcwfoUyCLHi2INGC5RTKRcExEGN9u1QWHnIR4TDBRVYdhdtaKd/wCaisw7fwuE/YMMQZANjIBAEETp5VW4WPOsaV7WG2wbkVfn/LSTv+sOv5VI6IniOVJ/tBj3/tG8tP6UPh4wH4B6ajtH14U9lZ4hB5KF6T+La31NX+GyflZZnPscVi2I4SFKw2ndVJ99N/i+mZxhPTFH6UJmcBtIJWewhIvyUAz0qL7pOZw7dNZ+dWKdrHHxm/h3H3jv/aC7NqMFHtMm1qpUxGHsk33geXSrElfuHChR/aIezrv2MQfjJ7um9VBciINPGCztOMw/VvSl95idXof71uppaz1Pqa1gFBsT8zf1R86UYn5m/rP60LqPU1wmrEKKvzY/1Uwo3M++h6VWJOU7xXAgv2lsD/xUBonJ5F8SdCyBuxIVR4liAPjUjMAy6iOYrXcKxJ+u+och9jMSA74iIZnTBY+ZkR76IynCcbDZiVOkMVm3avZgJmDI9YrFsqXmAaMSq/KvNGrWSIYW86nJocH2fGiAKEY1MNSNUbVJGaYwqRqaakjIpRTq6BSjdNd004CnRUjIpVJppU4EPF8LVhuvXDb4GsPlMsmJg4bPiImkEdoxcEzv3Fa3fFcTRhu/RGjxiR76z3DOHZdUAdVeZYa/ZBgBoDfyiowO+BhtlmQYyaFYdsSyi+2+/a99VKZbADADGDFpWyEe0pXfzrWPkMJlbDVVRXBkKAL2va02F+6shlsthhwdUBCCTJ9oHaWBBWRvHOmJD91hjZ28kI/SuD7uRJeOcDf1a1dx8gRjFASBqsTcxbpbzt8qgTKktEkiSP08zSFpmc3hKiaVfQyWBK2CsVv3299DjNYY2Q+7/bQmcth4JEwC48O2D867i4F/a98UY1LZ6Hpiq+FiqEgjQZ1Encrttz99U+XypebxHzqy4agAxVkHsrzn8aih+EG7eC/OmdC23ukvCv73uqYcIH5m91WSkUsR4UwLwY8eVW0AV4QnVvX9qeOEp0Pqaskenau7yrO04rP+mJ+X3n9aa3D0H4RV/h8LxnEqjR3wPcTXH4HmOWHP+JP91W1YzrZRR+Eegq74Pgg4bIQI16hFiDAv7hYyKlH2czLf+2B4ug+Bqx4fwHFVdLNhg7ntmIsB2tMdKrUsQHI7Kmf723umadmOyl2QNaxbvE8pnyobH4PjISGSY6EH0G5HlQDuBuIj69axhPGIC50AkFjA+PlVplsLV7RjlCiYnnqP6VHwDLYIUtie2e0G1MFF5CkKRI59D0oXP5psNysBb9QStgwIOzCD41bTIvBlABKkvA7iR38poFM8sSJI6xEft6U3K5+VVwDLciCABsSegqRnSQ4CuNxpEJJ/ERfUQAIk2j0O9P8AYkgxtHjXRliwBEAHeZ25RFAtnWLwe0SCfIfvFEJm4SCe2VnYnwJ8qZexmuOhXe1MIp2Tx2YFXIcCBIi89QNqeMPqfCBfc70ixCRXYqV8E8qhDiYBve3O1jSDwKcBXBTwKU5FKnUqgrftKf8AtsQf3Y/q7PzrG5PiyBRMBuypBEiBAJA2633tWr+1LH+GxCPw6W9HU1i8REP4V62ABv3i+9XzsyLrgfEFkhbBX2vz6TymqPiKjW+lz7bkAARuYEzVhkVX79FAWAIiAREzcH6vUWNg6HdJtqIncAg28jTB6cyOIfuwxMm4nuW4+Q8hUOuB4KxPjePlR3DMNXGlyQDIgbrYr58vQ70CuXdHdcRbHDfSSJXUFkQettqUblWBRJgw7biQZFx4WrueyyI6wAqsDsJiO41HwnFFl3JNgBqJmeXWtIeFl90I6QyiPWT9Gs25TKzeTYD7w79jw2dT8qAy+YKSQAZ6901tP/TohhrCllK3IO/goqBPski9psUEH+4D/qpnKKys2c+5ssegHzNIYmMfxR6D4VrcL7MobriSPAA+dqKHAsum5diNxq/2iryi8ay/DuF4+KZLlU5uZjyH4jWxyHDcLCA0yTzYmWbnc9O4VA+aKCyPoBEEKLAzFhePLpUWZzKMLyYIMXB99ZvLWpMWuazbC4DaQJhYsRPIb+v7WGQzOtJBYMwMauRFqyfDM+w7DmTqiRJ3mAfq21XeHjxef05TQfi8yGI5Yljt4wRfblyo5mQksACbTB274rOZfio1aTIIMX2JI27/ANqdxHPDLprt7JKnSApMgKhjqW6bTRgxZYuMcXFAGkjDOpyYtIjSJtMG57wN9uZnguAW7MKYOpD7BBtE3078rVT8HzJfDCargyTNySbkjmSST4nvq/y+aVZCqVO2ogNYc4nbw699G1M68YeIEdNP3aFgjsGlVtJOzCe8i4ruWDO/8Q2GjAg6RAVLQNZm1oMAX+B1bkOAMREcbqTBgcyA091u+hsy+sHRdvZGpbDbcDfwPTlV0WWz+UxXxIRU1GI0ayZ7yVhY3kxQWXyWcwnZjhuQTBFiD3rBkyOgMxV4iHLKPvGaFJOowJJJYk6Re5Nh3Cq3O/bBJ0Yaa2Ngz3A7x+tMN7GcO7S6ymktMA8tNulpM+gonFUNYiR/z+1MOYmP+Z2vQK5o65klZYR4Non1EedTGJs7mdI0qAsGTFrcz3DvruJmRoAJ0sV2G4t05U9kUsTEkDfyNr0mSRtPdzpk7Wq7KYuhlXWYNirTJNvKNunLrVkBLSQJjfum1dTBVZMAcz89+6o8tiar8ibCqK3RS08CmrUgFaDlKlSqCs4nl/vMPEQEAujAaiAJItv31jcPh7llCw1hzUGdzYnl8L0SuI+I4ZYYNBuCSZgg3vUOFnYUogGttShtJLANCjSD3R7qigy2E64vbQgSb29KssxlsRndkCMhNjq3sJ7pn4U/h3DngagxiZLsAWJ5Qb/XnRefzpwhGm8CxItytFqdCo4fmThgjEADKYKmJnebfhjp1pue4kXBUeyd5iPIfM+lBZh2di7G5/4+FMPfSll9n8Mfed+kgRHumtdhoFHYibxJ6edYzhGLpxAem/hImtimXBMkkn07+VY5e2oemBJ7SAWuQSL8zY/vQHE84+EQFBCEe2Ze/S+w8asMVtlKtpkCQSACSAOXf4UM+GSsaMS/4WVDym4ZgLes0TW+PLLtU2JmHe5cnwsPQU1JW4JB7vq/gasV4UquJLpr2SQb89lYC14miE4YhMST4D5zHurpMeuf9eGenMjxgCA6BepUEqZvMXKnxt38qOzuWw8Qgwwt7SCARy3B9arMv9lgzn7zFxWG40nQIJJFt9o57zWiymWXAVUWSi2AnUQNpk7iufLPjycvHf0q7/03ggSA8m/In5fHzod+Ex7LkDqS3lyI8q0WI917ZQ7wLg9x7qA48T/DYoLFuwxE9NLczc0Tus7ijxcrmVIh0eLgxtym8XjuotMA4igY5ELJCAHeIm1p8Tzry1gKRUdBXTwHlXo44e+EwbCcMv5TKkCNhaJnvqyyGM2GZ1sLdkWMSZIIG9+fj3V5MAOg91ejfZ7hT4uUwilioInUFiXJsYP6UcuOQ8eVvTQJxBdTO+8GwNvG+1TJnSwgKQto0tHv2NZrMHFwyUxELrzIEMO+BZh4dKWR0qzOjlg0W5iOXyrnhyNL96Lqz6hEsphp8QfOgcHheWcltJCndZIANxb8trwKCXHmXBF7EMJn5USmZ6tYGSAI8Nu8j6FXYB8VyjYY7DM4UytoYd07MIrmRzKP21I1Dste4PMEcr/Cr3+IDIIdRyKkDvA5b7ULi8JRxIIDDZkgE+MD3bUnesRI0/uK5j42hQZ0yQL9TyoXPZbEAhXEjnYHpBGxv4bV3J5skhcRQJiCQACe79qYM605MQkOrGZMX94joABRmDhwKExUAcAKFAE26tcm1HYQpZSKKdSWuk0hylXJpU4nmiZrMYbaUcpolQbQQvO4JIgUc3EPu0L4YCuzjUgBvZtUhv72kwIN6zeK7zBM7cydxIoheIspmxNjLANBHSRFOVNOeI5lCQUVSCRJWVuIBBMydyI2qqcswd3ktqABIgGCFJttMDvoQ8TdxDNMSZtz38qk4avYxLzKySOqkH51XlcxTjPZjm1QzXXeRYzTasQrh57Tfy/MVs8ljsyKQJa45W9eorCYGLoYN9QbVq/s/mydS9QCPK1Z5RqLxMF2VlcahpI3mZ8uXdVN/GY6qRdmDETpuVIEdLg6hPeJq8XNmNgDNpn5ETXMNnEQbap9phHvuO6sy+K9szjZvMFwoZgWAhTq36jSu/KxtNXnCVzKIVdHcySCYsOkuQd59auv4xoi070HxNziIVjSbEG+4uPKm3TDsHGcGXKIOhYMfRdvWpwrsnZ7YIsQVUN1H929ZzDxGuTCnYyZIIgHcdOtHcNxyryoENuQD43NFjp48Z6q5yOEGUa1GtTDDpFh42tNQfaPCAy7xtocc/yNFQ5niTo+tVTTHbuZnwA6RearFzGJiYgRwNLkhmY+0WHZtYEEcoi9HGd652vNYrhr1ofZbDH/ALWD/Sv+2nr9mU/+ng/0D9K6+TGPIga9f+wA/wC0Qyedv8TU5fs8g/BhjwRf0q2yeWTDXSkR5fKw8BRyuwws1iI5KHtGbRYg7gSTv3d21UHFuChAHdgg1AEr7V7Dax6xV1nbgqya16m8Hl7+htQWT4gGXQZxVghuzMQYiTZvDe29cOXl8bVP/SQoIXMqymQVZZsd7gAiuphKvYUqwgAkWkQRfzm/dV22HgkdjLq/+BQPfVScPQACoToot6AUcfL9yt/BoS48f+a0OHlwptPfexjuqkyWGrOvOOm8fXwq5fNKsBjcjwPxrpWYizOEBLaSxP5d9vCh8LBTVdXBJtLMQRYXBAA8IPOjkxtYbQIPUxfe3j49aGGYdDDBokXgHeOkbX2otw7YWJw8bix91QQVsR58jReazQABEEnbnv8AKhcXOgrLAlTY6VLEHlYAnziK3GT5rhagsznBhozOeyomeu1o/NcCO+gOFcVd3ZMVQr+0kbFeYB5suxpiq51Uqj1Uqg8xxcqkzrPgF/U/KmvhJzJt3gbeNdzolQe+hCO6mdtW4sMPHw0FkB8Tqov+JYoYCgFTYDcG0fXSqVVYiykjzNWWWkJ0se6iyKUKqjYWrsU7Bw5Mc6KzPDnRdRFq1rIHTV9wLUCp6WPv/aqOpMLMMsQaL2o1zZg6u1Ii4aBFG4OdgABTfny8apMtxMlZ0yfOO+plxxHtkHoYttWcaiy/jG1QQ3cdhTV4iFYgy0+Y5nyPdQwUagwMk/L4fvUrkAG0noNzQtdfqAJPdUrZ1lWAsiOVvdQIzYINyp2uJvPSiA1pF/L4TQtPwcyCvsnVaQx9fOpshnSG0tEEi4FlggqfIgVGsbm/dU+UcAkgBZ3MSffTuN8bPsaP7827Bvt7P6+NcOM35G9V/WhkzgKwououDNz+8fCq7+KbUZVhMGJgibX8u7lReTPjFyMZ49g+bJ+tMbNH2SFvYdqZm3KetC5rM6kMG56iY8qqmzzKAUQsZi4JiBbba5A9apytM4yrPiiO9iDpB2EFTb8QIuN7HpQr4hMBwU5BlGtD0gC6t03HeaLXOHSCVjaRMx+1Q4+eQKZMjuFrCqWiwz+LayKGUdW9pvIQB5me6p+G55MRdJBkXhr7ye+D3d9ArxZG0gIxkGJiBG81Ic8xMADxpp2SYssPBQNqUenW8+dLM4iGzOFPI6gpA9bjeqZ8y5kBjbkLfCKrHwSWIKjtC45QI5+XTlVkC/gK4dcVu8AWMCOo8fGKmfPj8o6gsf0qs1AQTvt0+tqETGJdifZAAHeaRbb7FcVxCXCuQAy9kqSB5HrQqYWIhlHtM3JP/PjNH4bqV0sAV6GDHeJofOvhTCKbblQ4X/EFv7q6ceUzLHK8eW7KouI8TDLocFmR9ZAgKwhgD4c+4qKq8zm8XEZHXsnDWVC/hXrfcsZPh41psfhWHjFNa6dJ7WiIYSDpa+q8DcCqHiuVxcHGZjbWewwspHJY5ECBFHXxu79G4X2pYAasHUeZBgHwEWpUJ/E4J9pBq52P612jf4Sq1EpsCY26xTEDkeyqmegHXqfCnqO0VmIJFQFBF/jVDqTU8EHEHKINh6UTkxaNWre9+YjnVeEtFE5YEculVilLDxCpBUkHrUmNm8RxDuWHQ0xkpk1YHL1Ll51AfVxUdPwX7S+NKaTL6NOlhHMGPn0tUuCmGwjaOd586DTHJULAsJn68aMwMSDfYC1c62Owvu+hJFhII/aowBBJEHkOfWDv30P980kGwOxG4qJsB4sdQ3vUhOFl8M6pMyeu3dTi6rCk8oE8wBQ5AcR7LVK2GSoB36m9SSzG0H3fQqDCzN2cnTAmwk8vX3VGM0uoKVMn6iieH4KOWKEiLEESLdxqsXHoZw3NIy/jkWN+gHfy29aIbEXfSJvc3+FMw8uYgEAdAsU9cBRasm3agXPDVZrxyvbfbaY86fhYutQyyZ62JoTMo/t6QIHK08ukiae2ZXDEE9reBvt9Xp6AnGaAe7eh8ZSdjpmZtPrURxmN1DGZ5GO7eKZg6pgupYzA1LJ57AnYD41ajUTTdiBe37zTcXiAWyjV12sOpPKPM0sfLOTGsC2ygT6tePAVV5cFXDklgwkAtNpitSCrBs46kagAG/LEH/FO/jFFnMgkqAxYb6QDHvqhTOLgJi4JQOMQllYgbEALfex3Hd31tuFcNyGYwMR1JlC4TS5WEwwvbcMbTZiCb6hT4jVHms3pUkrED8TIu3+KagTEcgSpFgYIiLD9au2+x+EMJHxXxEdllgMNSom4AKxsIrO8XOjGXRiviAiGOgqTpA5bOYO46GasGjDjQBXcrjoPwgn+ZlPlBj3VXZvAxNAN1WZuACel946Dvp7jax2mo6s845xFYAlZ/Oq4ojxGkr6E1Dkco5H3eIynDsU0ksNQJ/OJXfa3dVcmbZe8THf686mfOFhCAyRcxHrG9MxXlfay+4Rba0t3n96VArk+szzg0qx4cV5VkmBYkgbk/Gnrg1IorqiujJIsbWqQLXOdc++QbsAaidpFCstGLUDi58akhiuNUpSuFaks0cHQbRPxO310q5lYuQvef3rL5fE0ypEqfcauMLiCkdojzAPzBrNlalTurdu8jkRsPU9LeVE5XUoAgm0SRz6xUGFiqwIUjlcJ0uPxe6pcxxh0gEQOXYN/DtRWezvSd8wkAOhB6gH17qjOdRD7Skf3pFEHExGtAnuX/mq3Fy+ZcOdACrJJABED8s7+QqkSR8TCeZYA3j4i9qdgOiCRmApi4as8xJ3J9beVNCDoK14s60GLxgjbGU/4f2oLG4q5M63J2sAO+J391V+npXVFU4xaITiDzuT/ADOx+EV0cRxJkMFn8qgH1MmoIqRcObRTkWrDJcPxMbtOzleR1Bib8pNufKrHLcFCYiur2WZBAnYg7R8OVUC4RnlRnD3bD7euQjScMSGK+0WEjTtO5nsnpVgXeLhYal2SdbkajpJ2AAE2jwqqzmXUEOABc6o2M2J6bwZqVs0DjNiK4CYgJDgBzAMFSh2IPiRAiajTiqS9pRVtMLqaYJgLzF5tttenEEzDjYgMOhuPI7g94vUKYCXWXRW9pZkHpHTznan4+OGiMNFX+7Ja/eT8qBxNYPZiOUzUm4/65Cxh4mYB5IQrj+rUCR4LVfnc1jO7hCXlYYwMJrg7DE0sGiZgcxvvWUGYxB18iDTMXiOJbU779aMS9zGdGjS1mFhqMk2gDyufIdabhZ3TdoACjdr+MfKapv4kkS3bU7agJEcp3EfpUWLmbREd0z8auzkaXBZMYrpYWmY5T+8++pUQJJ5yYmOpj3UF9mcUIoZlDqSSQefLlRGZzGvGKqpVS1tyPqabJGNdOY767RJ4YPzH3frSqOslXZqOa6zWqRrY9piKiGGDtvzJ3qPFNhU+VNz5UkYgtFR4gvUqi9LGE3oQfTTorsCkBUiimmpFQ9K4cOpL37MYyQ6uJE23NyB7rVo8EhXOlbja23IkFhz9axfBMYJigNsSPMgzHnet1l8SZlfd8K58p23x9IFJXEIiAT32G1o76IwMKVsTMm8C0W+PrVFxLii4WYIPaUoNRAnS3WBv2QNtvOiE+0GAB7cnoFM/80eNOsrjZZ1YowgqSDy2NdGEf1qfMYmt2aI1MWjuJn68KZaurmQwx411UFOVrVw399SdUfW1dH19cqaD1pym/wBfXKpOxNuf10qLEwySI3Bp+m4p6/tWUGxlfSJZFCzcKZg+cd0xPXaicrwtzhnHcFsNTElgJMx2Qd495sOcdiRG4qTI4rYJBTSQDIw3GpJO5UT2WiRI6mxrR0bw7gGtGfEb7pBcsbqAD2rHYx0t7qqbMzaAxQEkEi+mYBYDYnp1MUfxHjmJmWGGwGEm5vqUwQQbDtEclHM+dD5rFhQiKQgMwfaY/mc9eg2AsKgGbCt31V5/LsO1y+FWuWxSbEU98ObGrUzyvCx3yPS/yqJgx5Grl8oszAmonwybDu+VOhaZJ0CAElSojxo7K5rCYoHMwDJi+8geM2qkcEGGBG8eU1CjATeLfXnQmnbM9NvGuVksTNGTelUTR9etcfY/XKlSpQfE5fXSiMrufD50qVKHN8z86T/Ou0qxQcPr30h+nxNKlSSpp2H11pUqkixfZ9flQ+Dm8TSe2/8AUa7SqhH4ex+udNTelSqCRf0+dOGwrtKpHNz8P0pGlSqRr7nw+dOP6/KlSqTq059/IfA0qVZRx510beXzpUqg4u1dfn9daVKtE9tz4Goz9etKlUEPM+NMXf0+IpUqlV59ofZX+X5Vk33NdpVRAMTc0qVKtF//2Q=="
                      alt="Third slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="col-6">
              <div>
                <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                  Hình ảnh sau khi dọn dẹp
                </span>
              </div>
              <div
                id="carouselExampleControls2"
                className="carousel slide z-depth-1-half"
                data-ride="carousel"
                data-interval="false"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="d-block"
                      src="data:image/jpeg;base64,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"
                      alt="First slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgzOBj8W7ESzN219BNomdrRL9SZENz6eFasQ&usqp=CAU"
                      alt="Second slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block"
                      src="data:image/jpeg;base64,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"
                      alt="Third slide"
                      style={{ width: "700px", height: "400px" }}
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls2"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls2"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Progress .....</div>
      )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getBookingDetail.table,
  dataSerGroup: state.getServiceGroups.table,
});
const withConnect = connect(mapStateToProps);
export default withConnect(GetBooking);
