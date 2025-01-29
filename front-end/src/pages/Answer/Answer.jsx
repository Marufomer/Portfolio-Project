import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Header from "../../components/Header/Header";
import { Alert, Container } from "react-bootstrap";
import "./answer.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import profile from "../../assets/profi-img.jpg";
import timeAgo from "../../helper.js";

function Answer() {
  const token = localStorage.getItem("token");
  const [allAnswers, setAllAnswer] = useState([]);
  const [user, setUser] = useState({});
  const answer = useRef(null);
  const navigater = useNavigate();
  const [image, setImage] = useState(undefined);
  const [questions, setQuestion] = useState("");
  const { question_id } = useParams();
  const [show, setShow] = useState("");
  const [time, setTime] = useState('')
  const reverseArray = () => {
    setAllAnswer((prevData) => [...prevData].reverse());
  }


  async function getAllQuestions() {
    try {
      const { data } = await axios.get(`/question/single_question/${question_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestion(data.questions[0])
      setTime(timeAgo(data.questions[0].created_at));
    } catch (error) {
      console.log(error.response);
      navigater("/login");
    }
  }

  async function getTotalAnswer() {
    try {
      const { data } = await axios.get(`/answer/all_answer/${question_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAllAnswer(data.answers);
      reverseArray();
      setDesc(data.answers[0].descrption);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function handlerYourAnswer(e) {
    e.preventDefault();

    const answerValue = answer.current.value;

    try {
      const { data } = await axios.post(
        `/answer/post_answer`,
        {
          answer: answerValue,
          user_id: user.user_id,
          question_id: user.question_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setShow("You answered successfully thank you for helping community!. Your answer will appear in 5 seconds");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function checkUser() {
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const userId = data.user_id;
      setUser({ user_id: userId, question_id: question_id });
    } catch (error) {
      console.log(error.response);
      navigater("/login");
    }
  }

  async function getImage() {
    try {
      const { data } = await axios.get(
        `/user/getProfile/${questions.user_id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setImage(data[0].image);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser();
    getAllQuestions();
    getTotalAnswer();
    getImage();
  }, [questions.user_id]);

  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <div className="answer-inner-title">
          <div className="answer-inner-question">{questions.title}</div>
          <div className="answer-inner-Ot">
            <div className="answer-inner-left">
              <div className="answer-inner-left-text">{time}</div>
            </div>
            <div className="answer-inner-right">
              {image && (
                <img
                  src={`http://localhost:4000/profile/${questions.user_id}-user.png`}
                  alt=""
                />
              )}
              {!image && <AccountBoxIcon />}
              <span className="question-inner-img-text">
                {questions.firstName}
              </span>
            </div>
          </div>
          <hr />
          <div className="answer-inner-desc">{questions.descrption}</div>
        </div>
        <div className="answer-user">
          <div className="answer-user-title">Answer</div>
          <div className="answer-user-container">
            {allAnswers.length === 0 && <span>No answer</span>}
            {allAnswers?.map((el) => {
              return (
                <div className="answer-user-inner">
                  <div className="answer-user-inner-desc">{el?.answer}</div>
                  <div className="answer-user-inner-info">
                    <div className="answer-user-inner-info-left">
                      <div>{timeAgo(el?.created_at)}</div>
                    </div>
                    <div className="answer-user-inner-info-right">
                      <span>Answered by:</span>
                      <img
                        src={`http://localhost:4000/profile/${el.user_id}-user.png`}
                        alt=""
                      />
                      <span> {el?.firstName}</span>
                    </div>
                  </div>
                  <hr className="answer-user-inner-info-Hr" />
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className="your-answer">
          <div className="your-answer-header">Your Answer</div>
          {show && (
            <Alert
              className="alert-container"
              key={"success"}
              variant={"success"}
            >
              {show}
            </Alert>
          )}
          <form onSubmit={handlerYourAnswer}>
            <textarea
              className="your-answer-textarea"
              ref={answer}
              required
            ></textarea>
            <br />
            <button className="your-answer-button">Post Answer</button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Answer;
