import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
import "./question.css";
import Header from "../../components/Header/Header";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { formatDistanceToNow } from "date-fns";
import axios from "../../axiosConfig";

function Question() {

  const token = localStorage.getItem("token");
  const title = useRef(null)
  const descrption = useRef(null);
  const tags = useRef(null);
  const [show, setShow] = useState('');
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState('')
  const navigater = useNavigate();

  async function handleQuestionSubmit(e) {
    e.preventDefault();
    const tittleValue = title.current.value;
    const descrptionValue = descrption.current.value;
    const tagsValue = tags.current.value;

    try {
      const { data } = await axios.post(
        `/question/post_question`,
        {
          user_id: user,
          title: tittleValue,
          descrption: descrptionValue,
          tags: tagsValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setShow(
        "You have created question successfully! community will help you. Redirect to home page in 5 seconds......"
      );
      setTimeout(() => {
        navigater('/');
      }, 5000);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setAlert(error?.response?.data?.message);
    }
  }
  async function checkUser() {
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.user_id);
    } catch (error) {
      console.log(error.response);
      navigater("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <div className="questionAsk-inner">
          <div className="questionAsk-inner-icon">
            <QuestionMarkIcon className="icon-size" />
          </div>
          <div className="questionAsk-inner-text">Ask a questions</div>
        </div>
        <Container className="questionAsk-container">
          <form onSubmit={handleQuestionSubmit}>
            <div className="questionInput-Title">
              <div className="questionInput-Title-text">Title</div>
              <div className="questionInput-Title-desc">
                Be specific and imagine you’re asking a question to another
                person.
              </div>
              <div className="questionInput-Title-input">
                <input
                  type="text"
                  placeholder="e.g is there an R function in a vector?"
                  required
                  ref={title}
                />
              </div>
            </div>
            <div className="questionInput-Title">
              <div className="questionInput-Title-text">
                What are the details of your problem?
              </div>
              <div className="questionInput-Title-desc">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </div>

              <textarea
                className="questionAsk-texarea"
                required
                ref={descrption}
              ></textarea>
            </div>
            <div className="questionInput-Title">
              <div className="questionInput-Title-text">Tags</div>
              <div className="questionInput-Title-desc">
                Add your 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </div>
              {alert && (
                <span className="span-danger">
                  Invalid format. Provide tags separated by spaces like: 'react
                  bootstrap java
                </span>
              )}
              <div className="questionInput-Title-input">
                <input
                  type="text"
                  placeholder="e.g react boostrap javascript....."
                  required
                  ref={tags}
                />
              </div>
            </div>
            {show && (
              <Alert
                className="alert-container"
                key={"success"}
                variant={"success"}
              >
                {show}
              </Alert>
            )}
            <button className="button-ask" type="submit">
              Submit question
            </button>
          </form>
        </Container>
      </Container>
    </>
  );
}

export default Question;
