import React from "react";
import Header from "../../components/Header/Header";
import { Container } from "react-bootstrap";
import "./answer.css";
import profile from '../../assets/profi-img.jpg'

function Answer() {

  function handlerYourAnswer(e) {
    e.preventDefault();
  }
  return (
    <>
      <Header />
      <Container className="mt-4 py-4">
        <div className="answer-inner-title">
          <div className="answer-inner-question">
            What is the best way to optimize MySQL queries?
          </div>
          <div className="answer-inner-Ot">
            <div className="answer-inner-left">
              <div className="answer-inner-left-text">2 min ago</div>
            </div>
            <div className="answer-inner-right">
              <img src={profile} alt="" />
              <span className="question-inner-img-text">Maruf</span>
            </div>
          </div>
          <hr />
          <div className="answer-inner-desc">
            I'm encountering an issue in my production environment where the
            WebSocket connection to wss://xyz.com:8080/ws fails. Interestingly,
            this issue was also present in my local development environment, but
            it was resolved after running npm run build and serving the build
            output. However, the problem persists in the production environment
            where I have hosted the application on Cloud Run. Additionally, the
            error message specifically mentions a WebSocket connection issue,
            but I don’t have WebSocket set up in my app, nor do I need it. Could
            anyone provide insight into the following: Why is the WebSocket
            connection error showing up in production? How can I remove or
            disable the WebSocket connection attempt if it's not required in my
            app? What could be causing this issue on Cloud Run specifically? I'd
            appreciate any suggestions or guidance on how to resolve this issue.
          </div>
        </div>
        <div className="answer-user">
          <div className="answer-user-title">Answer</div>
          <div className="answer-user-container">
            <div className="answer-user-inner">
              <div className="answer-user-inner-desc">
                What is you exact error you are seeing? Hint: in WSS this is
                most times related to certificate configuration, you can start
                for testing with self-signed certs, but for production you need
                officially signed certs.
              </div>
              <div className="answer-user-inner-info">
                <div className="answer-user-inner-info-left">
                  <div>10 min ago</div>
                </div>
                <div className="answer-user-inner-info-right">
                  <span>Answered by:</span>
                  <img src={profile} alt="" />
                  <span> Amir</span>
                </div>
              </div>
              <hr className="answer-user-inner-info-Hr" />
            </div>
            <div className="answer-user-inner">
              <div className="answer-user-inner-desc">
                Although the current Python 3.13 supports Unicode 15.1.0 in its
                unicodedata module and can identify the supported code points,
                that won't help you with Unicode 16.0.0. If you download the
                UnicodeData.txt files for each version (15.1.0, 16.0.0) you can
                parse them yourself for the supported characters and write them
                to a file; although, without a font supporting Unicode 16.0.0
                you won't see much. UnicodeData.html describes the data format.
              </div>
              <div className="answer-user-inner-info">
                <div className="answer-user-inner-info-left">
                  <div>40 min ago</div>
                </div>
                <div className="answer-user-inner-info-right">
                  <span>Answered by:</span>
                  <img src={profile} alt="" />
                  <span> Ferhan</span>
                </div>
              </div>
              <hr className="answer-user-inner-info-Hr" />
            </div>
            <div className="answer-user-inner">
              <div className="answer-user-inner-desc">
                The set is the set of printable characters excluding blanks,
                i.e. excluding the subset of whitespace characters that are
                included in the definition of a printable character. Then remove
                all characters with an age property value of less than or equal
                to 15.1. For character details, use the latest version of
                unicodedataplus, a drop in replacement for unicodedata that has
                additional methods and supports Unicode 16.
              </div>
              <div className="answer-user-inner-info">
                <div className="answer-user-inner-info-left">
                  <div>3 hr ago</div>
                </div>
                <div className="answer-user-inner-info-right">
                  <span>Answered by:</span>
                  <img src={profile} alt="" />
                  <span> Emran</span>
                </div>
              </div>
              <hr className="answer-user-inner-info-Hr" />
            </div>
          </div>
        </div>
        <hr />
        <div className="your-answer">
          <div className="your-answer-header">Your Answer</div>
          <form onSubmit={handlerYourAnswer}>
            <textarea className="your-answer-textarea" required></textarea><br/>
            <button className="your-answer-button">Post Answer</button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Answer;
