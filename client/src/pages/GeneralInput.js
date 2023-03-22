import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./GeneralInput.css";

const GeneralInput = ({ questions, categories }) => {
  const [soldiers, setSoldiers] = useState([]);
  const [showQuestions, setShowQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [checkedArray, setCheckedArray] = useState(false);
  const [factsFromTestType, setFactFromTestType] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/general/soldier`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        setSoldiers(Object.entries(response.data));
      });

    axios
      .get(`http://localhost:8080/api/tests/fact/${params.ttid}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        setFactFromTestType(response.data);
      });

    var dict = {};
    questions.map((question) => {
      // this sets the initial showQuestions object to false
      dict[question.id] = false;
    });
    setShowQuestions(dict);

    var dict3 = {};

    questions.map((question) => {
      var dict2 = {};
      soldiers.map((sol) => {
        // this sets the initial checkbox fileds

        factsFromTestType.map((fact) => {
          if (
            sol[1].serial_id.toString() === fact.soldier_serial_id &&
            question.id === fact.question_id
          ) {
            dict2[sol[1].serial_id] = fact.score === 1 ? true : false;
          } else {
            dict2[sol[1].serial_id] = false;
          }
        });
      });

      // this sets the initial answers object to empty strings
      dict3[question.id] = dict2;
    });

    setCheckedArray(dict3);
    setLoaded(true);
  }, [loaded]);

  const update = () => {
    setLoaded(false);

    var dict3 = {};

    questions.map((question) => {
      var dict2 = {};

      soldiers.map((sol) => {
        dict2[sol[1].serial_id] = false;
      });

      soldiers.map((sol) => {
        // this sets the initial checkbox fileds

        factsFromTestType.map((fact) => {
          /// need to fix here so we can get questions with the answers in advance.
          if (
            sol[1].serial_id.toString() === fact.soldier_serial_id &&
            question.id === fact.question_id
          ) {
            dict2[sol[1].serial_id] = fact.score === 1;
          }
        });
      });
      // this sets the initial answers object to empty strings
      dict3[question.id] = dict2;
      dict2 = null;
    });
    setCheckedArray(dict3);
    setLoaded(true);
  };

  const sendClicked = () => {
    axios
      .post(
        "http://localhost:8080/api/tests/fact/generalInput",
        [checkedArray, params.ttid, params.rid],
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((response) => {
        navigate(`/`);
      });
  };

  const selectAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to false
      dict2[sol[1].serial_id] = true;
    });

    setCheckedArray({ ...checkedArray, [e.target.value]: dict2 });
  };

  const removeAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to false
      dict2[sol[1].serial_id] = false;
    });

    setCheckedArray({ ...checkedArray, [e.target.value]: dict2 });
  };

  const questionClicked = (e) => {
    setShowQuestions({
      ...showQuestions,
      [e.target.value]: !showQuestions[e.target.value],
    });
  };

  const checkBoxChanged = (e) => {
    var newSolCompleteList = {
      ...checkedArray[e.target.value[0]],
      [e.target.value.slice(2)]:
        !checkedArray[e.target.value[0]][[e.target.value.slice(2)]],
    };
    setCheckedArray({
      ...checkedArray,
      [e.target.value[0]]: newSolCompleteList,
    });
  };

  return (
    <div dir="rtl" id="general-input">
      <h2>הזנת ביצוע</h2>
      <ul id="general-input-questions">
        {loaded ? (
          questions.map((question) => {
            if (checkedArray[question.id] === undefined) update();
            return (
              <div key={question.id}>
                <li
                  onClick={(e) => {
                    questionClicked(e);
                  }}
                  value={question.id}
                  className="li-general-question"
                  dir="rtl"
                >
                  {question.name}
                </li>

                {showQuestions[question.id] === true ? (
                  <div>
                    <div className="btns-add-rmv">
                      <button
                        value={question.id}
                        onClick={(e) => {
                          selectAllClicked(e);
                        }}
                      >
                        סמן הכל
                      </button>
                      <button
                        value={question.id}
                        onClick={(e) => {
                          removeAllClicked(e);
                        }}
                      >
                        נקה הכל
                      </button>
                    </div>
                    {soldiers.map((sol) => {
                      return (
                        <ul key={sol[1].serial_id}>
                          <li>
                            <span>{sol[1].full_name}</span>
                            <input
                              type="checkbox"
                              value={[question.id, sol[1].serial_id]}
                              checked={
                                checkedArray[question.id][sol[1].serial_id]
                              }
                              onChange={(e) => checkBoxChanged(e)}
                            />
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <h4>loading</h4>
        )}
      </ul>
      <button onClick={sendClicked}>שלח</button>
    </div>
  );
};

export default GeneralInput;
