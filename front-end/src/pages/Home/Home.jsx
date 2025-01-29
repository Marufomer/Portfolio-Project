import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import QuestionCard from "../../components/QuestonCard/QuestionCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import "./home.css";
import { Navigate, useNavigate } from "react-router-dom";
// react-redux
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "../../redux/userInfoReducer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const reverseArray = () => {
    setQuestions((prevData) => [...prevData].reverse());
  };
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Student Information
  const first_Name = useSelector((state) => state.userInfo.firstName);
  
  

  function handleQuestion() {
    return navigate("/question");
  }

  async function getAllQuestions() {
    try {
      const { data } = await axios.get("/question/all_questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestions(data.questions)
      reverseArray();
    } catch (error) {
      console.log(error.response);
      navigate("/login");
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
      const fName = data.first_name;
      dispatch(getUserAction({ userId, fName }));
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }


  useEffect(() => {
    checkUser();
    getAllQuestions();
   
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
            <h4>Welcome, {first_Name}</h4>
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
