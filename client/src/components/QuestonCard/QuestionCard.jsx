import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import './Question.css'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../axiosConfig";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import timeAgofun from "../../helper.js";

const QuestionCard = ({ question }) => {
  const navigater = useNavigate();
  const [answer, setAnswer] = useState(null)
  const timeAgo = timeAgofun(question.created_at);
  const token = localStorage.getItem("token");
  const question_id = question.question_id;
 
  let userId = useSelector((state) => state.userInfo.user_id);
  const [image, setImage] = useState(undefined);
  

  async function getTotalAnswer() {
    try {
      const { data } = await axios.get(`/answer/all_answer/${question_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      
      setAnswer(data.answers.length);
    } catch (error) {
      console.log(error.response);
      navigater("/login");
    }
  }
  function handleAnswer(question_id) {
    return navigater(`/answer/${question_id}`);
  }

  async function getImage() {
      try {
        const { data } = await axios.get(
          `/user/getProfile/${question.user_id}`,
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
    getTotalAnswer();
    getImage();
  }, [])

  
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{question?.title}</Card.Title>
        <p>{`${question?.descrption.slice(0, 300)}...`}</p>
        <div className="mb-2">
          {question.tags.map((tag, index) => (
            <Badge key={index} bg="primary" className="badge-inner me-2">
              {tag}
            </Badge>
          ))}
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="question-inner-footer">
          <div
            className="question-inner-footer-left"
            onClick={() => handleAnswer(question.question_id)}
          >
            <span className="question-inner-answer">💬answers {answer}</span>
          </div>
          <div className="question-inner-footer-right">
            <div className="question-inner-text">{timeAgo}</div>
            <div className="question-inner-img">
              {image && (
                <img
                  src={`https://portfolio-project-production-fbf9.up.railway.app/profile/${image}`}
                  alt="profile-image"
                />
              )}
              {!image && <AccountBoxIcon className="que-card" />}

              <span className="question-inner-img-text">
                {question.firstName}
              </span>
            </div>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default QuestionCard;
