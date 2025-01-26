import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./question.css";
import Header from "../../components/Header/Header";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function Question() {

  function handleQuestionSubmit(e) {
    e.preventDefault();
  }
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

              <textarea className="questionAsk-texarea" required></textarea>
            </div>
            <div className="questionInput-Title">
              <div className="questionInput-Title-text">Tags</div>
              <div className="questionInput-Title-desc">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </div>
              <div className="questionInput-Title-input">
                <input
                  type="text"
                  placeholder="e.g react boostrap javascript....."
                  required
                />
              </div>
            </div>
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
