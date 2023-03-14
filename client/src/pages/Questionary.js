import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Questionary.css";
import axios from "axios";
import Questions from "../components/Questions";
import NavBar from "../components/NavBar";
import GeneralInput from "./GeneralInput";

const Questionary = ({ soldier }) => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [previuoslySubmited, setPreviuoslySubmited] = useState(false);
  const [facts, setFacts] = useState([]);
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
      if (!previuoslySubmited) {
        //if this is the first submit for the soldier
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
      } else {
        //if the soldiers test is being updated
        let oldFacts = facts;
        facts.map((fact) => {
          let ans = 0;
          questions.map((question) => {
            if (question.id === fact.question_id) ans = answers[question.name];
          });
          fact.score = ans;
        });
        setFacts(oldFacts);
        axios
          .post(`http://localhost:8080/api/tests/fact/update`, [
            facts,
            Object.values(comments),
            new Date().toISOString().slice(0, 10),
          ])
          .then((response) => {
            navigate(`/`);
          });
      }
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

    //load old answers if previuosly filled out
    if (sol !== undefined) {
      axios
        .get(
          `http://localhost:8080/api/tests/fact/${sol.serial_id}/${params.ttid}`
        )
        .then((response) => {
          if (response.data.length > 0) {
            setFacts(response.data);

            setPreviuoslySubmited(true);
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
          } else {
            var dict1 = {};
            questions.map((question) => {
              // this sets the initial answers object to empty strings
              dict1[question.name] = "undefined";
            });
            setAnswers(dict1);
            setLoaded(true);
          }
        });
    }
  }, [params.ttid, loaded]);

  return (
    <div>
      <NavBar />
      {sol !== undefined ? (
        <div>
          {" "}
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
        </div>
      ) : (
        <GeneralInput questions={questions} categories={categories} />
      )}

      {error ? (
        <p dir="rtl" style={{ color: "red" }}>
          שגיאה, נא ודא הזנה נכונה
        </p>
      ) : null}
    </div>
  );
};

export default Questionary;
