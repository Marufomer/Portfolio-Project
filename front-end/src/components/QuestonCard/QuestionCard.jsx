import React from "react";
import { Card, Badge } from "react-bootstrap";
import './Question.css'
import profile from '../../assets/profi-img.jpg'
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const navigater = useNavigate();

  function handleAnswer() {
    return navigater('/answer')
  }
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <p>
          I have a script which I found where it takes a image id and lets the
          image scroll till a set limit here - (2550 px), is there any function
          called followFrom in jQuery where is tells the...
        </p>
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
          <div className="question-inner-footer-left" onClick={handleAnswer}>
            <span className="question-inner-answer">💬answers {question.answers}</span>
          </div>
          <div className="question-inner-footer-right">
            <div className="question-inner-text">
              {question.answers} min ago
            </div>
            <div className="question-inner-img">
              <img src={profile} alt="" />
              <span className="question-inner-img-text">Maruf</span>
            </div>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default QuestionCard;
