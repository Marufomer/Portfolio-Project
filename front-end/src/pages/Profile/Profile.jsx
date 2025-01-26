import React from "react";
import "./profile.css";
import { Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import profile from "../../assets/profi-img.jpg";

function Profile() {

  function handlerProfile(e){
     e.preventDefault();
  }
  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <div className="profile">
          <div className="profile-left">
            <img
              className="profile-left-img"
              src={profile}
              alt="Profile image"
            />
          </div>
          <div className="profile-right">
            <div className="profile-right-name">Maruf Umer</div>
            <div className="profile-right-email">omermaruf07@gmail.com</div>
          </div>
        </div>
        <form onSubmit={handlerProfile}>
          <input className="profile-img-file" type="file" />
          <hr />
          <div className="profile-inner">
            <div className="profile-inner-left">
              <div className="profile-inner-left-container">
                <div className="profile-inner-left-bodyL">
                  <span className="profile-inner-left-num">5</span>
                  <br />
                  <span className="profile-inner-left-textQ">
                    All questions
                  </span>
                </div>
                <div className="profile-inner-left-bodyR">
                  <span className="profile-inner-left-num">2</span>
                  <br />
                  <span className="profile-inner-left-textA">All Answer</span>
                </div>
              </div>
            </div>
            <div className="profile-inner-right">
              <div className="profile-inner-right-title">Edit Profile</div>
              <div className="profile-inner-right-inputField">
                <span>Frist Name</span>
                <br />
                <input type="text" value={"Maruf"} />
              </div>
              <div className="profile-inner-right-inputField">
                <span>Last Name</span>
                <br />
                <input type="text" value={"Umer"} />
              </div>
              <div className="profile-inner-right-inputField">
                <span>Old Passsword</span>
                <br />
                <input type="password" />
              </div>
              <div className="profile-inner-right-inputField">
                <span>New Password</span>
                <br />
                <input type="password" />
              </div>
              <div className="profile-inner-right-inputField">
                <span>Confirm Password</span>
                <br />
                <input type="password" />
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
