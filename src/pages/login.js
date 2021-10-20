import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import * as authenticateActions from "./../actions/authentication/authentication";
import { useDispatch } from "react-redux";
import { useLocation, withRouter } from "react-router";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const { username, password } = input;
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(authenticateActions.login(password, username));
    }
  };

  // useEffect(() => {
  //   dispatch(authenticateActions.logout());
  // });
  return (
    <div className="container">
      <h3>Admin</h3>
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
