import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Questionary.css";
import axios from "axios";
import Questions from "../components/Questions";
import NavBar from "../components/NavBar";

const Questionary = ({ soldier }) => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sol = location.state.soldier;
  const isMashadTest = location.state.isMashad;

  const handleSubmit = (e) => {
    var ansGood = true;
    for (const ans in answers) {
      if (
        answers[ans] === "undefined" ||
        answers[ans] > 100 ||
        answers[ans] < 0
      ) {
        setError(true); //bad answers
        ansGood = false;
      }
    }
    if (ansGood) {
      const soldier = location.state.soldier;
      axios
        .post(`http://localhost:8080/api/tests/fact`, [
          soldier.serial_id,
          params.ttid,
          params.rid,
          new Date().toISOString().slice(0, 10),
          questions,
          Object.values(answers),
          null, //parent batalion id- need to change
          Object.values(comments),
        ])
        .then((response) => {
          navigate(`/`);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/question/${params.ttid}`)
      .then((response) => {
        setCategories(
          response.data.filter((item) => {
            return item.input_type === null;
          })
        );
        setQuestions(
          response.data.filter((item) => {
            return item.input_type != null;
          })
        );
      });

    //load old answers if previuosly filled out -------------------------must fix here!!!
    axios
      .get(
        `http://localhost:8080/api/tests/fact/${sol.serial_id}/${params.ttid}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          var dict = {};
          questions.map((question) => {
            // this sets the initial answers object to the previous answers
            var ans;
            response.data.map((fact) => {
              if (fact.question_id === question.id) ans = fact.score;
            });

            dict[question.name] = ans;
          });

          setAnswers(dict);
          setLoaded(true);
          console.log(answers);
        } else {
          var dict1 = {};
          questions.map((question) => {
            // this sets the initial answers object to empty strings
            dict1[question.name] = "undefined";
          });
          setAnswers(dict1);
          setLoaded(true);
          console.log(answers);
        }
      });
  }, [params.ttid, loaded]);

  return (
    <div>
      <NavBar />
      <div id="soldier-info">
        <h1 dir="rtl">{sol.full_name}</h1>
      </div>
      <Questions
        questions={questions}
        categories={categories}
        answers={answers}
        setAnswers={setAnswers}
        comments={comments}
        setComments={setComments}
        isMashadTest={isMashadTest}
        loaded={loaded}
      />
      <button id="submit" onClick={(e) => handleSubmit(e)}>
        שלח
      </button>
      {error ? (
        <p dir="rtl" style={{ color: "red" }}>
          שגיאה, נא ודא הזנה נכונה
        </p>
      ) : null}
    </div>
  );
};

export default Questionary;
