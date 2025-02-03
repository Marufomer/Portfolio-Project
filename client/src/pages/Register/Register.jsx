import React, { useRef, useState }  from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
// react-redux
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/userInfoReducer";
import "./register.css";
import { Container, Alert } from "react-bootstrap";

function Register() {
    const navigate = useNavigate();
    const firstName = useRef(null)
    const lastName = useRef(null)
    const email = useRef(null);
    const password = useRef(null);
    const [show, setShow] = useState('');
    const dispatch = useDispatch();

  async function handelerRegister(e) {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const firstNameValue = firstName.current.value;
    const lastNameValue = lastName.current.value;

    if (!emailValue || !passwordValue || !firstNameValue || !lastNameValue) {
      setShow("Please provide all required information");
    }

    try {
      
      const { data } = await axios.post("/user/register", {
        email: emailValue,
        password: passwordValue,
        firstName: firstNameValue,
        lastName: lastNameValue
      });
      console.log(data);
      const userId = data.user_id;
      const fName = data.first_Name;
      dispatch(getUserAction({ userId, fName }));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setShow(error?.response?.data?.message);
      console.log(error);
    }

  }

  function handleLogin() {
    return navigate("/login");
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

          <form onSubmit={handelerRegister}>
            <div className="login-title">
              <img
                className="login-title-img"
                src="https://intranet.alxswe.com/assets/holberton-logo-full-alx-d053727941512ebe04b797ca87d81a195004e9ff2d8a6aedf4004c5365cf8944.png"
                alt=""
              />
              <span className="login-title-text">Forum</span>
            </div>
            <div className="login-input">
              <span className="login-inputTit">First Name</span>
              <br />
              <input
                className="login-inputI"
                type="text"
                ref={firstName}
                required
              />
              <br />
            </div>
            <div className="login-input">
              <span className="login-inputTit">Last Name</span>
              <br />
              <input
                className="login-inputI"
                type="text"
                ref={lastName}
                required
              />
              <br />
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
              <button>Sign Up</button>
            </div>
            <div className="login-to-register">
              {" "}
              Already have an account?{" "}
              <span onClick={handleLogin}>Sign in</span>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Register;
