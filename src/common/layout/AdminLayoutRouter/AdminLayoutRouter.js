import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./../../../components/Menu/SideBar";
import Header from "./../../../components/Menu/Header";

const AdminLayoutRouter = (props) => {
  const { classes, component: YourComponent, ...remainsprops } = props;

  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        // if (!localStorage.getItem("token")) {
        //   return (
        //     <Redirect
        //       to={{ pathname: "/", state: { from: routeProps.location } }}
        //     />
        //   );
        // }
        return (
          <div>
            <div className="row">
              <div className="col-2 pr-0">
                <Sidebar />
              </div>

              <div
                className="col-10 justify-content-end pl-0 pr-0"
                id="headers"
              >
                <Header />

                <YourComponent {...routeProps} />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default AdminLayoutRouter;
