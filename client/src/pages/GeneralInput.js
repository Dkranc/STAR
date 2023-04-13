import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Collapse,
  Button,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
      if (!CompanyChoicePage)
        await axios
          .get(`http://localhost:8080/api/tests/fact/${params.ttid}`, {
            headers: { token: sessionStorage.getItem("token") },
          })
          .then((response) => {
            setFactFromTestType(response.data);
          });

      await axios
        .get(`http://localhost:8080/api/general/soldier`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setSoldiers(Object.entries(response.data));
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
              if (
                sol[1].serial_id.toString() === fact.soldier_serial_id &&
                question.id === fact.question_id
              ) {
                if (question.input_type === "boolean")
                  dict2[sol[1].serial_id] = fact.score === 1 ? true : false;
                else dict2[sol[1].serial_id] = fact.score;
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
    //setLoaded(false);

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
              if (question.input_type === "boolean")
                dict2[sol[1].serial_id] = fact.score === 1 ? true : false;
              else dict2[sol[1].serial_id] = fact.score;
            }
          });
        }
      });
      // this sets the initial answers object to empty strings
      dict3[question.id] = dict2;
      dict2 = null;
    });
    setCheckedArray(dict3);
    console.log(dict3);
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
            toast.success("הבקשה נשלחה בהצלחה");
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
          toast.success("הבקשה נשלחה בהצלחה");
          navigate(`/`);
        });
    }
  };

  const selectAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to true
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
      [e.target.id]: !showQuestions[e.target.id],
    });
  };

  const gradeChange = async (e, qid, sid) => {
    const val = e.target.value;

    if (val >= 0 && val <= 100) {
      const fixedList = {
        ...checkedArray[qid],
        [sid]: val,
      };
      setCheckedArray({ ...checkedArray, [qid]: fixedList });
    }
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
    console.log(finalCheckedBoxesList);
  };

  return (
    <Box
      display="flex"
      dir="rtl"
      id="general-input"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      {!CompanyChoicePage ? (
        <Typography sx={{ fontSize: "40px", fontFamily: "Bold" }}>
          הזנת ביצוע
        </Typography>
      ) : null}
      {loaded ? (
        <List
          id="general-input-questions"
          dense
          dir={"rtl"}
          sx={{
            backgroundColor: "#F3F3F3",
            width: "100%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {questions.map((question) => {
            if (checkedArray[question.id] === undefined) update();
            const labelId = `checkbox-list-label-${question.id}`;
            return (
              <Box
                sx={{ marginY: "10px", width: "80%" }}
                key={question.id}
                value={question.id}
              >
                <ListItem
                  sx={{
                    boxShadow: " 1px 1px 4px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    background: "white",
                    borderRadius: "10px",
                    border: "none",
                    flexDirection: "column",
                    direction: "flex",
                  }}
                  dir={"rtl"}
                  key={question.id}
                >
                  <ListItemButton
                    onClick={(e) => {
                      questionClicked(e);
                    }}
                    id={question.id}
                    value={question.id}
                    sx={{ fontFamily: "Bold" }}
                    dir="rtl"
                  >
                    {question.name}
                    {showQuestions[question.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    orientation={"vertical"}
                    in={showQuestions[question.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      dir="rtl"
                      display="flex"
                      component="div"
                      disablePadding
                    >
                      {showQuestions[question.id] === true ? (
                        <Box>
                          {!CompanyChoicePage &&
                          question.input_type === "boolean" ? (
                            <Box className="btns-add-rmv">
                              <Button
                                id={question.id}
                                value={question.id}
                                onClick={(e) => {
                                  selectAllClicked(e);
                                }}
                              >
                                סמן הכל
                              </Button>
                              <Button
                                value={question.id}
                                onClick={(e) => {
                                  removeAllClicked(e);
                                }}
                              >
                                נקה הכל
                              </Button>
                            </Box>
                          ) : null}

                          {soldiers.map((sol) => {
                            return (
                              <ListItem
                                sx={{ border: "none" }}
                                alignItems="flex-end"
                                dir={"rtl"}
                                key={sol[1].serial_id}
                                secondaryAction={
                                  question.input_type === "boolean" ||
                                  question.input_type === undefined ? (
                                    <input
                                      type="checkbox"
                                      value={[question.id, sol[1].serial_id]}
                                      checked={
                                        checkedArray[question.id][
                                          sol[1].serial_id
                                        ]
                                      }
                                      onChange={(e) => checkBoxChanged(e)}
                                    />
                                  ) : (
                                    <TextField
                                      sx={{
                                        fontFamily: "Light",
                                        width: "70px",
                                        heigh: "15px",
                                        borderRadius: 30,
                                        background: "white",
                                        boxShadow:
                                          "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
                                      }}
                                      placeholder="1-100"
                                      size="small"
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="any"
                                      name={question.name}
                                      value={
                                        /*need to find value from prev test*/
                                        checkedArray[question.id][
                                          sol[1].serial_id
                                        ]
                                      }
                                      onChange={(e) =>
                                        gradeChange(
                                          e,
                                          question.id,
                                          sol[1].serial_id
                                        )
                                      }
                                    />
                                  )
                                }
                              >
                                <ListItemText
                                  sx={{
                                    marginRight: "40px",
                                    fontFamily: "Bold",
                                    textAlign: "right",
                                  }}
                                  dir={"rtl"}
                                  id={labelId}
                                  primary={sol[1].full_name}
                                />
                              </ListItem>
                            );
                          })}
                        </Box>
                      ) : null}
                    </List>
                  </Collapse>
                </ListItem>
              </Box>
            );
          })}
        </List>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="success" />
        </Box>
      )}

      <Button
        sx={{
          background:
            "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
          boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
          color: "black",
          fontFamily: "Bold",
          fontSize: "20px",
          paddingX: "20%",
          borderRadius: "30px",
          marginTop: "20px",
        }}
        onClick={sendClicked}
      >
        שלח
      </Button>
      <h4 style={{ color: "red" }}>{error ? "שגיאה, ודא הזנה נכונה" : null}</h4>
    </Box>
  );
};

export default GeneralInput;
