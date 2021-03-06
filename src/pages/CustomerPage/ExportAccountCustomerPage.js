import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import * as getCustomersActions from "../../actions/Customer/GetCustomers";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteEmployeeApi } from "../../apis/Employees/DeleteEmployee";
import { updateEmployeeStatusApi } from "../../apis/Employees/UpdateEmployeeStatus";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as moment from "moment";
import { useStateValue } from "../../common/StateProvider/StateProvider";
import Pagination from "@mui/material/Pagination";
import * as getSearchCustomerActions from "../../actions/Customer/SearchCustomer";

const AccountCustomerPage = (props) => {
  const [search, setSearch] = useState("");
  const dispatchAction = useDispatch();
  const [{ page, perPage, loading1 }, dispatch] = useStateValue();
  const totalPageCustomer = localStorage.getItem("TotalPageCustomer");
  useEffect(() => {
    dispatchAction(getCustomersActions.getCustomers(page, perPage));
  }, [page, perPage, loading1]);
  const { data, loading, dataSearch } = props;

  const handleChangePage = (event, value) => {
    dispatch({ type: "CHANGE_PAGE", newPage: value });
  };

  const handleSearch = () => {
    if (search === "") {
      dispatchAction(
        getSearchCustomerActions.searchCustomer(" ", page, perPage)
      );
    }
    dispatchAction(
      getSearchCustomerActions.searchCustomer(search, page, perPage)
    );
  };

  const handleOnClickDelete = (id) => {
    handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeApi(id);
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

  const handleActive = (id) => {
    handleUpdateEmployeeStatus(id);
  };

  const handleUpdateEmployeeStatus = async (id) => {
    try {
      await updateEmployeeStatusApi(id);
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
  return (
    <div className="container table-responsive-xl p-0 mt-2">
      <div className="row m-0">
        <h2>Xem tr?????c khi xu???t t???p tin</h2>
        <div className="col-3 ml-auto">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success"
            // className="btn btn-success mx-auto d-block"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="T???i file excel"
          />
        </div>
      </div>
      <form className="input-group mb-3 border-0" style={{ width: "500px" }}>
        <input
          className="ml-auto form-control"
          type="text"
          placeholder="T??m ki???m t??n t??i kho???n"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSearch}
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
      <table className="table align-middle mt-2 ml-1" id="table-to-xls">
        <thead className="table-light">
          <tr>
            <th scope="col">T??n ta??i khoa??n</th>
            <th scope="col">Ho?? va?? t??n</th>
            <th scope="col">??i??a chi??</th>
            <th scope="col">S??? d??</th>
            <th scope="col">Gi???i t??nh</th>
            <th scope="col">Email</th>
            <th scope="col">S??? ??i???n tho???i</th>
            <th scope="col">Ng??y / gi??? t???o t??i kho???n</th>
          </tr>
        </thead>
        {!loading ? (
          data ? (
            dataSearch ? (
              search === "" || dataSearch.total === 0 ? (
                data.data.map((item, index) => (
                  <tbody>
                    <tr className="align-middle" key={index}>
                      <td className="col-2 align-middle">
                        {item.userName !== null ? (
                          <span>{item.userName}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-2 align-middle">
                        {item.fullname !== null ? (
                          <span>{item.fullname}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-4 align-middle">
                        {item.address !== null ? (
                          <span>{item.address}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                        {item.ward !== null ? (
                          <span>, &nbsp;{item.ward.description}</span>
                        ) : (
                          <span></span>
                        )}
                        {item.district !== null ? (
                          <span>, &nbsp;{item.district.description}</span>
                        ) : (
                          <span></span>
                        )}
                        {item.province !== null ? (
                          <span>, &nbsp;{item.province.description}</span>
                        ) : (
                          <span></span>
                        )}
                        .
                      </td>
                      <td className="col-2 align-middle">
                        {item.balance !== null ? (
                          <span>{item.balance} VND</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.gender !== null ? (
                          <span>{item.gender}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.email !== null ? (
                          <span>{item.email}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.phoneNumber !== null ? (
                          <span>{item.phoneNumber}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-4 align-middle">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : search !== "" && dataSearch.total !== 0 ? (
                dataSearch.data.map((item, index) => (
                  <tbody>
                    <tr className="align-middle" key={index}>
                      <td className="col-2 align-middle">
                        {item.userName !== null ? (
                          <span>{item.userName}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-2 align-middle">
                        {item.fullname !== null ? (
                          <span>{item.fullname}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-4 align-middle">
                        {item.address !== null ? (
                          <span>{item.address}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                        {item.ward !== null ? (
                          <span>, &nbsp;{item.ward.description}</span>
                        ) : (
                          <span></span>
                        )}
                        {item.district !== null ? (
                          <span>, &nbsp;{item.district.description}</span>
                        ) : (
                          <span></span>
                        )}
                        {item.province !== null ? (
                          <span>, &nbsp;{item.province.description}</span>
                        ) : (
                          <span></span>
                        )}
                        .
                      </td>
                      <td className="col-2 align-middle">
                        {item.balance !== null ? (
                          <span>{item.balance} VND</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.gender !== null ? (
                          <span>{item.gender}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.email !== null ? (
                          <span>{item.email}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="align-middle">
                        {item.phoneNumber !== null ? (
                          <span>{item.phoneNumber}</span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                      <td className="col-4 align-middle">
                        {item.dateCreated ? (
                          <span>
                            {moment(item.dateCreated).format("DD/MM/YYYY")}
                            &nbsp;/ {item.dateCreated.substring(11, 16)}
                          </span>
                        ) : (
                          <span>Ch??a c?? d??? li???u</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <div>Kh??ng t??m th???y k???t qu???</div>
              )
            ) : (
              data.data.map((item, index) => (
                <tbody>
                  <tr className="align-middle" key={index}>
                    <td className="col-2 align-middle">
                      {item.userName !== null ? (
                        <span>{item.userName}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="col-2 align-middle">
                      {item.fullname !== null ? (
                        <span>{item.fullname}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="col-4 align-middle">
                      {item.address !== null ? (
                        <span>{item.address}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                      {item.ward !== null ? (
                        <span>, &nbsp;{item.ward.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.district !== null ? (
                        <span>, &nbsp;{item.district.description}</span>
                      ) : (
                        <span></span>
                      )}
                      {item.province !== null ? (
                        <span>, &nbsp;{item.province.description}</span>
                      ) : (
                        <span></span>
                      )}
                      .
                    </td>
                    <td className="col-2 align-middle">
                      {item.balance !== null ? (
                        <span>{item.balance} VND</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.gender !== null ? (
                        <span>{item.gender}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.email !== null ? (
                        <span>{item.email}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {item.phoneNumber !== null ? (
                        <span>{item.phoneNumber}</span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                    <td className="col-4 align-middle">
                      {item.dateCreated ? (
                        <span>
                          {moment(item.dateCreated).format("DD/MM/YYYY")}
                          &nbsp;/ {item.dateCreated.substring(11, 16)}
                        </span>
                      ) : (
                        <span>Ch??a c?? d??? li???u</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))
            )
          ) : (
            <div>Ch??a c?? d??? li???u</div>
          )
        ) : (
          <div>Loading .....</div>
        )}
      </table>
      <Pagination
        count={Math.ceil(totalPageCustomer / perPage)}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.getCustomers.table,
  loading: state.getCustomers.loading,
  dataSearch: state.searchCustomer.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(AccountCustomerPage));
