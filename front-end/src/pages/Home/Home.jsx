import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestonCard/QuestionCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import quuestion from "../../questions";
import Header from "../../components/Header/Header";
import './home.css'
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleQuestion() {
     return navigate('/question')
  }

  useEffect(() => {
    setQuestions(quuestion)
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <Container className="d-flex py-5">
          <Col className="w-50">
            <h4>Welcome, Maruf</h4>
          </Col>
          <Col className="w-50 ask-button">
            <Button onClick={handleQuestion}>Ask question</Button>
          </Col>
        </Container>
        <Row>
          <Col md={8} className="mx-auto">
            {questions.length > 0 ? (
              questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            ) : (
              <p>No questions found!</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
