import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { Doughnut, Bar } from "react-chartjs-2";

const TransactionPage = (props) => {
  const validationSchema = yup
    .object({
      description: yup.string().required("Tên dịch vụ không được để trống"),
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
    <div className="container">
      <div className="row ml-5">
        <div className="col-4 mr-5">
          <Doughnut
            data={{
              labels: ["Booking hủy", "Booking đang đợi", "Booking hoàn thành"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    // "#e8c3b9",
                    // "#c45850",
                  ],
                  data: [2478, 5267, 734],
                },
              ],
            }}
            option={{
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        </div>
        <div className="col-4" style={{ marginLeft: "200px" }}>
          <Doughnut
            data={{
              labels: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                  ],
                  data: [2478, 5267, 734, 1200, 680],
                },
              ],
            }}
            option={{
              title: {
                display: true,
                text: "Predicted world population (millions) in 2050",
              },
            }}
          />
        </div>
      </div>
      <div>
        <Bar
          data={{
            labels: ["Mon", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            datasets: [
              {
                label: "Doanh số trong một tuần",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#3e95cd",
                  "#8e5ea2",
                ],
                data: [2478, 5267, 734, 784, 433, 530, 942],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050",
            },
          }}
        />
      </div>
      <div>
        <Bar
          data={{
            labels: ["Mon", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            datasets: [
              {
                label: "Số lượng tài khoản mới trong một tuần",
                backgroundColor: [
                  "#3e95cd",
                  "#8e5ea2",
                  "#3cba9f",
                  "#e8c3b9",
                  "#c45850",
                  "#3e95cd",
                  "#8e5ea2",
                ],
                data: [2478, 5267, 734, 784, 433, 530, 942],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050",
            },
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getTransaction.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(TransactionPage));
