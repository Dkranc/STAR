import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List,ListItem } from "@mui/material";
import axios from "axios";
import "./GeneralInput.css";

const GeneralInput = ({ questions, categories }) => {
  const [soldiers, setSoldiers] = useState([]);
  const [showQuestions, setShowQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [checkedArray, setCheckedArray] = useState(false);
  const [factsFromTestType, setFactFromTestType] = useState([]);
  const CompanyChoicePage = window.location.pathname === "/CompanyChoice";
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async function anyNameFunction() {
      await axios
        .get(`http://localhost:8080/api/general/soldier`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setSoldiers(Object.entries(response.data));
        });

      if (!CompanyChoicePage)
        await axios
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

          if (CompanyChoicePage) {
            const company =
              sol[1].company === "א" ? 1 : sol[1].company === "ב" ? 2 : 3;
            if (company === question.id) {
              dict2[sol[1].serial_id] = true;
            }
          } else {
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
          }
        });

        // this sets the initial answers object to empty strings
        dict3[question.id] = dict2;
      });

      setCheckedArray(dict3);
      setLoaded(true);
    })();
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

        if (CompanyChoicePage) {
          const company =
            sol[1].company === "א" ? 1 : sol[1].company === "ב" ? 2 : 3;
          if (company === question.id) {
            dict2[sol[1].serial_id] = true;
          }
        } else {
          factsFromTestType.map((fact) => {
            /// need to fix here so we can get questions with the answers in advance.
            if (
              sol[1].serial_id.toString() === fact.soldier_serial_id &&
              question.id === fact.question_id
            ) {
              dict2[sol[1].serial_id] = fact.score === 1;
            }
          });
        }
      });
      // this sets the initial answers object to empty strings
      dict3[question.id] = dict2;
      dict2 = null;
    });
    setCheckedArray(dict3);
    setLoaded(true);
  };

  const LegitCompanyInput = () => {
    var countSoldiers = 0;
    for (const [company, soldiers] of Object.entries(checkedArray)) {
      for (const [soldier, soldierValue] of Object.entries(soldiers)) {
        if (soldierValue) countSoldiers++;
      }
    }

    if (countSoldiers === soldiers.length) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };

  const sendClicked = () => {
    if (CompanyChoicePage) {
      //make sure all soldiers have a company assigned
      if (LegitCompanyInput()) {
        axios
          .post(
            "http://localhost:8080/api/general/soldier/updateCompanyInfo",
            [checkedArray],
            { headers: { token: sessionStorage.getItem("token") } }
          )
          .then((response) => {
            window.alert("העדכון נשלח בהצלחה");
            navigate(`/`);
          });
      }
    } else {
      axios
        .post(
          "http://localhost:8080/api/tests/fact/generalInput",
          [checkedArray, params.ttid, params.rid],
          { headers: { token: sessionStorage.getItem("token") } }
        )
        .then((response) => {
          navigate(`/`);
        });
    }
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

  const checkBoxChanged = async (e) => {
    var finalCheckedBoxesList = checkedArray;
    var fixedList = {};
    if (CompanyChoicePage) {
      let filledBox =
        checkedArray[e.target.value[0]][[e.target.value.slice(2)]];
      //if it was empty we need to check no one else has this soldier in their list.
      if (!filledBox) {
        for (const [companyId, conmpanyBoxes] of Object.entries(checkedArray)) {
          for (const [soldier, soldierValue] of Object.entries(conmpanyBoxes)) {
            if (
              soldier === e.target.value.slice(2) &&
              soldierValue &&
              companyId !== e.target.value[0]
            ) {
              fixedList = {
                ...checkedArray[companyId],
                [soldier]: !soldierValue,
              };

              //switch the old marked box
              finalCheckedBoxesList = {
                ...checkedArray,
                [companyId]: fixedList,
              };
            }
          }
        }
      }
    }

    var newSolCompleteList = {
      ...checkedArray[e.target.value[0]],
      [e.target.value.slice(2)]:
        !checkedArray[e.target.value[0]][[e.target.value.slice(2)]],
    };

    finalCheckedBoxesList = {
      ...finalCheckedBoxesList,
      [e.target.value[0]]: newSolCompleteList,
    };

    setCheckedArray(finalCheckedBoxesList);
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
                    {!CompanyChoicePage ? (
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
                    ) : null}

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
      <h4 style={{ color: "red" }}>{error ? "שגיאה, ודא הזנה נכונה" : null}</h4>
    </div>
  );
};

export default GeneralInput;
