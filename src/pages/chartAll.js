import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getChartsActions from "../actions/Chart/GetChart";
import * as getChartTransactinonActions from "../actions/Chart/GetChartTransaction";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as moment from "moment";
import { Doughnut, Bar } from "react-chartjs-2";

const ChartPage = (props) => {
  const dispatchAction = useDispatch();
  useEffect(() => {
    dispatchAction(getChartsActions.getCharts());
    dispatchAction(getChartTransactinonActions.getChartTransaction());
  }, []);
  const { data, dataTransaction } = props;
  console.log(dataTransaction);
  console.log(data);
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

  const dateListRender = () => {
    var dateList = [];
    if (dataTransaction) {
      for (let index = 0; index < dataTransaction.length; index++) {
        dateList.push(moment(dataTransaction[index].date).format("DD/MM/YYYY"));
      }
    }
    return dateList;
  };
  const totalListRender = () => {
    var totalList = [];
    if (dataTransaction) {
      for (let index = 0; index < dataTransaction.length; index++) {
        totalList.push(dataTransaction[index].total);
      }
    }
    return totalList;
  };

  return (
    <div className="container">
      <div className="row ml-5">
        {data ? (
          <div className="col-4 mr-5">
            <span style={{ fontWeight: "bold", marginLeft: "120px" }}>
              Đặt lịch
            </span>
            <Doughnut
              data={{
                labels: [
                  `${data.bookingWaiting.name}`,
                  `${data.bookingDone.name}`,
                  `${data.bookingCancelled.name}`,
                  `${data.bookingOther.name}`,
                ],
                datasets: [
                  {
                    label: "Population (millions)",
                    backgroundColor: [
                      "#3e95cd",
                      "#8e5ea2",
                      "#3cba9f",
                      "#e8c3b9",
                      // "#c45850",
                    ],
                    data: [
                      `${data.bookingWaiting.quantity}`,
                      `${data.bookingDone.quantity}`,
                      `${data.bookingCancelled.quantity}`,
                      `${data.bookingOther.quantity}`,
                    ],
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
        ) : (
          <div>Progress .....</div>
        )}
      </div>
      {/* {dataTransaction ? (
        dataTransaction.length > 0 ? (
          dataTransaction.map((item, index) => (
            <div>
              <Bar
                data={{
                  labels: [`${moment(item.date).format("DD/MM/YYYY")}`],
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
                      data: [],
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
          ))
        ) : null
      ) : (
        <div>Progress .....</div>
      )} */}
      <div>
        <Bar
          data={{
            labels: dateListRender(),
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
                data: totalListRender(),
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
  data: state.getChart.table,
  dataTransaction: state.getChartTransaction.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(ChartPage));
