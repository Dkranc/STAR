import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import DropDownCompany from "../components/DropDownCompany";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";

const GeneralInput = ({ questions, categories, handleQuestionChange }) => {
  const [soldiers, setSoldiers] = useState([]);
  const [showQuestions, setShowQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [checkedArray, setCheckedArray] = useState(false);
  const [factsFromTestType, setFactFromTestType] = useState([]);
  const CompanyChoicePage = window.location.pathname === "/CompanyChoice";
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    (async function anyNameFunction() {
      console.log(params);
      if (!CompanyChoicePage)
        await axios
          .get(`http://localhost:8080/api/tests/fact/${params.ttid}`, {
            headers: { token: sessionStorage.getItem("token") },
          })
          .then((response) => {
            setFactFromTestType(response.data);
          });

      setSoldiers(
        location.state.soldiers.filter((soldier) => {
          return soldier.role === parseInt(params.rid);
        })
      );

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
          dict2[sol.soldier_serial_id] = false;
        });

        soldiers.map((sol) => {
          // this sets the initial checkbox fileds

          if (CompanyChoicePage) {
            const company =
              sol.company === "א" ? 1 : sol.company === "ב" ? 2 : 3;

            if (company === question.id) {
              dict2[sol.soldier_serial_id] = true;
            }
          } else {
            factsFromTestType.map((fact) => {
              if (
                sol.soldier_serial_id.toString() === fact.soldier_serial_id &&
                question.id === fact.question_id
              ) {
                if (question.input_type === "boolean")
                  dict2[sol.soldier_serial_id] =
                    fact.score === 1 ? true : false;
                else dict2[sol.soldier_serial_id] = fact.score;
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
        dict2[sol.soldier_serial_id] = false;
      });

      soldiers.map((sol) => {
        // this sets the initial checkbox fileds

        if (CompanyChoicePage) {
          const company = sol.company === "א" ? 1 : sol.company === "ב" ? 2 : 3;
          if (company === question.id) {
            dict2[sol.soldier_serial_id] = true;
          }
        } else {
          factsFromTestType.map((fact) => {
            /// need to fix here so we can get questions with the answers in advance.

            if (
              sol.soldier_serial_id.toString() === fact.soldier_serial_id &&
              question.id === fact.question_id
            ) {
              if (question.input_type === "boolean")
                dict2[sol.soldier_serial_id] = fact.score === 1 ? true : false;
              else dict2[sol.soldier_serial_id] = fact.score;
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
  const LegitCompanyName = () => {
    if (
      questions[0].plooga_name === null ||
      questions[1].plooga_name === null ||
      questions[2].plooga_name === null
    ) {
      return false;
    }
    if (
      questions[0].plooga_name === questions[1].plooga_name ||
      questions[1].plooga_name === questions[2].plooga_name ||
      questions[2].plooga_name === questions[0].plooga_name
    ) {
      return false;
    }
    return true;
  };
  const LegitCompanyInput = () => {
    var countSoldiers = 0;
    for (const [company, soldiers] of Object.entries(checkedArray)) {
      for (const [soldier, soldierValue] of Object.entries(soldiers)) {
        if (soldierValue) countSoldiers++;
      }
    }

    if (countSoldiers === soldiers.length && LegitCompanyName()) {
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
            [checkedArray, questions],
            { headers: { token: sessionStorage.getItem("token") } }
          )
          .then((response) => {
            toast.success("הבקשה נשלחה בהצלחה");
            navigate(`/`);
          });
      } else {
        toast.error("שגיאה בהזנת נתונים");
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
          navigate(`/Home`, {
            state: {
              soldiers: location.state.soldiers,
            },
          });
        });
    }
  };

  const selectAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to true
      dict2[sol.soldier_serial_id] = true;
    });

    setCheckedArray({ ...checkedArray, [e.target.value]: dict2 });
  };

  const removeAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to false
      dict2[sol.soldier_serial_id] = false;
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
    const vals = e.target.value.split(",");
    console.log(checkedArray);
    var finalCheckedBoxesList = checkedArray;
    var fixedList = {};
    if (CompanyChoicePage) {
      let filledBox = checkedArray[vals[0]][[vals[1]]];
      //if it was empty we need to check no one else has this soldier in their list.
      if (!filledBox) {
        for (const [companyId, conmpanyBoxes] of Object.entries(checkedArray)) {
          for (const [soldier, soldierValue] of Object.entries(conmpanyBoxes)) {
            if (soldier === vals[1] && soldierValue && companyId !== vals[0]) {
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
      ...checkedArray[vals[0]],
      [vals[1]]: !checkedArray[vals[0]][[vals[1]]],
    };

    finalCheckedBoxesList = {
      ...finalCheckedBoxesList,
      [vals[0]]: newSolCompleteList,
    };

    setCheckedArray(finalCheckedBoxesList);
  };

  const handleCompanySelected = (e, companyNum) => {
    let comps = companyNames;
    comps[companyNum - 1] = e.target.value;

    setCompanyNames(comps);
  };
  const [companyNames, setCompanyNames] = useState(["", "", ""]);

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
                {CompanyChoicePage ? (
                  <Box display="flex" flexDirection="row">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography
                        sx={{
                          fontSize: "20px",
                        }}
                        fontFamily="Bold"
                      >
                        {" "}
                        בחר שם לפלוגה: {question.id}
                      </Typography>
                    </Box>

                    <Box width="10px">
                      <DropDownCompany
                        question={question}
                        questions={questions}
                        handleQuestionChange={handleQuestionChange}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box></Box>
                )}

                <ListItem
                  onClick={(e) => {
                    questionClicked(e);
                  }}
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
                    id={question.id}
                    value={question.id}
                    sx={{
                      width: "100%",
                      fontFamily: "Bold",
                      justifyContent: "space-between",
                    }}
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
                                key={sol.soldier_serial_id}
                                secondaryAction={
                                  question.input_type === "boolean" ||
                                  question.input_type === undefined ? (
                                    <input
                                      type="checkbox"
                                      value={[
                                        question.id,
                                        sol.soldier_serial_id,
                                      ]}
                                      checked={
                                        checkedArray[question.id][
                                          sol.soldier_serial_id
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
                                          sol.soldier_serial_id
                                        ]
                                      }
                                      onChange={(e) =>
                                        gradeChange(
                                          e,
                                          question.id,
                                          sol.soldier_serial_id
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
                                  primary={sol.first_name + " " + sol.last_name}
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
      {/* <h4 style={{ color: "red" }}>{error ? "שגיאה, ודא הזנה נכונה" : null}</h4> */}
    </Box>
  );
};

export default GeneralInput;
