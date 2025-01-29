import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
// react-redux
import { useSelector, useDispatch } from "react-redux";
import {getUserAction} from '../../redux/userInfoReducer'
import "./login.css";
import { Container, Alert } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();


  async function handelerLogin(e) {
    e.preventDefault();

    const emailValue = email.current.value;
    console.log(emailValue);
    const passwordValue = password.current.value;
    console.log(passwordValue);

    if (!emailValue || !passwordValue) {
      setShow("Please provide all required information");
    }

    try {
      
      const { data } = await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });
      
      const userId = data.user_id;
      const fName = data.first_name;
      dispatch(getUserAction({ userId, fName }));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setShow(error?.response?.data?.message);
      console.log(error);
    }
  }

  function handleRegister() {
    return navigate("/register");
  }
  return (
    <>
      <Container>
        <div className="login-container">
          {show && (
            <Alert
              className="alert-container"
              key={"danger"}
              variant={"danger"}
            >
              {show}
            </Alert>
          )}

          <form onSubmit={handelerLogin}>
            <div className="login-title">
              <img
                className="login-title-img"
                src="https://intranet.alxswe.com/assets/holberton-logo-full-alx-d053727941512ebe04b797ca87d81a195004e9ff2d8a6aedf4004c5365cf8944.png"
                alt=""
              />
              <span className="login-title-text">Forum</span>
            </div>
            <div className="login-input">
              <span className="login-inputTit">Email</span>
              <br />
              <input
                className="login-inputI"
                type="email"
                ref={email}
                required
              />
              <br />
            </div>
            <div className="login-input">
              <span className="login-inputTit">Password</span>
              <br />
              <input
                className="login-inputI"
                type="password"
                ref={password}
                required
              />
              <br />
              <button>Login</button>
            </div>
            <div className="login-to-register">
              {" "}
              Don’t have an account?{" "}
              <span onClick={handleRegister}>Create a new account</span>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login;
