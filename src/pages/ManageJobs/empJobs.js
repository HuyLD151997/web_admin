import React, { Component, useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useDispatch, connect } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import * as parksData from "./../../data/skateboard-parks.json";
import img from "../../img/48x48.png";

const EmpJobsPage = (props) => {
  const libraries = ["places"];
  const [selectedPark, setSelectedPark] = useState(null);

  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const mapContainerStyle = {
    height: "280px",
    width: "370px",
  };
  const options = {
    // styles: mapStyles,
    // disableDefaultUI: true,
    // zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjnyL2BSaV2tCT8PGFZZmKkZQXqCDBSPs",
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="container table-responsive-xl p-0 mt-2">
      <h2>Danh sách công việc</h2>
      {parksData.features.map((park) => (
        <div
          className="row mb-5 border rounded"
          style={{ boxShadow: "10px 10px 5px grey" }}
        >
          <div className="col-4 mt-1">
            <div>
              <h5>Nhân viên</h5>
              <div className="row">
                <img
                  src={img}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <div>
                    <span style={{ fontWeight: 500 }}>Tài khoản:</span> emp20
                  </div>
                  <br />
                  <div>
                    <span style={{ fontWeight: 500 }}>Họ tên:</span> Lê Đức Huy
                  </div>
                </div>
              </div>
            </div>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "gray",
                backgroundColor: "gray",
              }}
            />
            <div>
              <h5>Khách hàng</h5>
              <div className="row">
                <img
                  src={img}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <div>
                    <span style={{ fontWeight: 500 }}>Tài khoản:</span> ABC
                  </div>
                  <br />
                  <div>
                    <span style={{ fontWeight: 500 }}>Họ tên:</span> Lê Đức Nam
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 mt-4">
            <div className="mt-1">
              <span style={{ fontWeight: 500 }}>Địa chỉ: </span>
              {park.properties.ADDRESS}
            </div>
            <div style={{ marginTop: "90px" }}>
              <span style={{ fontWeight: 500 }}>Trạng thái: </span>
              Đang xử lý
            </div>
            <button className="btn btn-info mt-5">Chi tiết</button>
          </div>
          <div className="col-4 mt-2">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={18}
              center={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0],
              }}
              options={options}
              // onClick={onMapClick}
              // onLoad={onMapLoad}
            >
              <Marker
                key={park.properties.PARK_ID}
                position={{
                  lat: park.geometry.coordinates[1],
                  lng: park.geometry.coordinates[0],
                }}
                onClick={() => {
                  setSelectedPark(park);
                }}
              />

              {selectedPark && (
                <InfoWindow
                  onCloseClick={() => {
                    setSelectedPark(null);
                  }}
                  position={{
                    lat: selectedPark.geometry.coordinates[1],
                    lng: selectedPark.geometry.coordinates[0],
                  }}
                >
                  <div>
                    <h5>{selectedPark.properties.NAME}</h5>
                    <p>{selectedPark.properties.DESCRIPTIO}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   data: state.getServiceGroups.table,
  //   loading: state.getServiceGroups.loading,
  //   dataSearch: state.searchServiceGroup.table,
});
const withConnect = connect(mapStateToProps);
export default withRouter(withConnect(EmpJobsPage));
