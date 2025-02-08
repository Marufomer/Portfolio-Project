import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./profile.css";
import { Container, Alert } from "react-bootstrap";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/userInfoReducer";
import profile from "../../assets/profi-img.jpg";

function Profile() {
  const token = localStorage.getItem("token");
  const fisrtName = useRef(null);
  const lastName = useRef(null);
  const new_passord = useRef(null);
  const confirm_password = useRef(null);
  const user_profile = useRef();
  const [image, setImage] = useState(undefined);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigater = useNavigate();
  let userId = useSelector((state) => state.userInfo.user_id);
  console.log(userId);
  const [totalAnswer, setTotalAnswer] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState(null);

  async function checkUser() {
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      let userId = data.user_id;
      let fName = data.first_Name;
      dispatch(getUserAction({ userId, fName }));
    } catch (error) {
      console.log(error.response);
      navigater("/login");
    }
  }

  async function getTotalAnswer() {
    try {
      const { data } = await axios.get(`/answer/total_answer/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalAnswer(data.total_answer);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function getTotalQuestion() {
    try {
      const { data } = await axios.get(`/question/total_question/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalQuestion(data.total_question);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      // navigater("/login");
    }
  }

  async function handlerProfile(e) {
    e.preventDefault();
    const firstNameValue = fisrtName.current.value;
    const lastNameValue = lastName.current.value;
    const newPassworvalue = new_passord.current.value;
    const confirmPasswordValue = confirm_password.current.value;

    if (newPassworvalue != confirmPasswordValue) {
      return setAlert(
        "Passwords are not the same. Please input same password in both field!"
      );
    }
    const formdata = new FormData();
    formdata.append("image", user_profile.current.files[0]);
    formdata.append("user_id", userId);
    console.log(user_profile.current.files[0]);

    try {
      if (user_profile.current.files[0]) {
        await axios.post(`/user/profile/${userId}`, formdata, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSuccess("Profile Updated! loading.....");
        setAlert('')
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      if (confirmPasswordValue) {
        await axios.patch(
          `/user/updatePassword`,
          {
            user_id: userId,
            password: confirmPasswordValue,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSuccess("Profile Updated! loading.....");
        setAlert('')
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setAlert(error?.response?.data?.message);
      setSuccess('')
    }
  }
  async function getImage() {
    try {
      const { data } = await axios.get(`/user/getProfile/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setImage(data[0].image);
      console.log(data[0].image);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser();
    getImage();
    getTotalAnswer();
    getTotalQuestion();
  }, [userId]);
  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <div className="profile">
          <div className="profile-left">
            {image && (
              <img
                className="profile-left-img"
                src={`https://portfolio-project-production-fbf9.up.railway.app/profile/${image}`}
                alt="Profile image"
              />
            )}
            {!image && (
              <AccountBoxIcon className="profile-left-img profile-icon" />
            )}
          </div>
          <div className="profile-right">
            <div className="profile-right-name">
              {user?.first_name} {user.last_Name}
            </div>
            <div className="profile-right-email">{user?.user_email}</div>
          </div>
        </div>
        <form onSubmit={handlerProfile}>
          <input className="profile-img-file" type="file" ref={user_profile} />
          <hr />
          <div className="profile-inner">
            <div className="profile-inner-left">
              <div className="profile-inner-left-container">
                <div className="profile-inner-left-bodyL">
                  <span className="profile-inner-left-num">
                    {totalQuestion}
                  </span>
                  <br />
                  <span className="profile-inner-left-textQ">
                    All questions
                  </span>
                </div>
                <div className="profile-inner-left-bodyR">
                  <span className="profile-inner-left-num">{totalAnswer}</span>
                  <br />
                  <span className="profile-inner-left-textA">All Answer</span>
                </div>
              </div>
            </div>
            <div className="profile-inner-right">
              {success && (
                <span className="profile-update">
                  <em>{success}</em>
                </span>
              )}

              {alert && (
                <span className="profile-alert">
                  <em>{alert}</em>
                </span>
              )}
              <div className="profile-inner-right-title">Edit Profile</div>
              <div className="profile-inner-right-inputField">
                <span>Frist Name</span>
                <br />
                <input
                  type="text"
                  disabled
                  value={user?.first_name}
                  ref={fisrtName}
                />
              </div>
              <div className="profile-inner-right-inputField">
                <span>Last Name</span>
                <br />
                <input
                  type="text"
                  value={user.last_Name}
                  disabled
                  ref={lastName}
                />
              </div>
              <div className="profile-inner-right-inputField">
                <span>New Password</span>
                <br />
                <input type="password" ref={new_passord} />
              </div>
              <div className="profile-inner-right-inputField">
                <span>Confirm Password</span>
                <br />
                <input type="password" ref={confirm_password} />
              </div>
              <button className="profile-inner-button">Save Change</button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Profile;
