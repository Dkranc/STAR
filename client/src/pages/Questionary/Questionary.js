//import react
import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

//import axios
import axios from "axios";

//import custom components
import Questions from "../../components/Questions";
import NavBar from "../../components/NavBar";
import SolPopUp from "../../components/SolPopUp";
import GeneralInput from "./../GeneralInput";
import toast from "react-hot-toast";
import "./Questionary.css";

//import mui
import { Button, Typography } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Box } from "@mui/system";
import { Fab } from "@mui/material";

const Questionary = ({ soldier, user, setUser }) => {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [previuoslySubmited, setPreviuoslySubmited] = useState(false);
  const [facts, setFacts] = useState([]);
  const rolesWithOutCommander = [
    { id: 2, name: "תותחן" },
    { id: 3, name: "טען" },
    { id: 4, name: "נהג" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const sol = location.state.soldier;
  const [chosenSoldiers, setChosenSoldiers] = useState({
    מפקד: sol,
  });

  const isMashadTest = location.state.isMashad;

  const sendChosenSoldiers = async () => {
    for (const [key, sold] of Object.entries(chosenSoldiers)) {
      let resLength = 0;
      let factData = [];

      await axios
        .get(
          `http://localhost:8080/api/tests/fact/${sold.soldier_serial_id}/${params.ttid}`,
          { headers: { token: sessionStorage.getItem("token") } }
        )
        .then((response) => {
          if (response.data.length > 0) {
            factData = response.data;
            resLength = response.data.length;
          }
        });

      if (resLength === 0) {
        //if this is the first submit for the soldier
        axios.post(
          `http://localhost:8080/api/tests/fact`,
          [
            sold.soldier_serial_id,
            params.ttid,
            key === "מפקד" ? 1 : key === "תותחן" ? 2 : key === "טען" ? 3 : 4,
            new Date().toISOString().slice(0, 10),
            questions,
            Object.values(answers),
            null, //parent batalion id- need to change
            Object.values(comments),
          ],
          { headers: { token: sessionStorage.getItem("token") } }
        );
      } else {
        //if the soldiers test is being updated

        factData.map((fact) => {
          let ans = 0;
          questions.map((question) => {
            if (question.id === fact.question_id) ans = answers[question.name];
          });
          fact.score = ans;
        });

        axios.post(
          `http://localhost:8080/api/tests/fact/update`,
          [
            factData,
            Object.values(comments),
            new Date().toISOString().slice(0, 10),
          ],
          { headers: { token: sessionStorage.getItem("token") } }
        );
      }
    }
    toast.success("הבקשה נשלחה בהצלחה");
    navigate(`/Home`, {
      state: {
        soldiers: location.state.soldiers,
      },
    });
  };

  const handleSubmit = (e) => {
    var ansGood = true;
    for (const ans in answers) {
      if (
        answers[ans] === "undefined" ||
        answers[ans] > 100 ||
        answers[ans] < 0 ||
        (params.ttid === "2" && Object.keys(chosenSoldiers).length !== 4)
      ) {
        setError(true); //bad answers
        ansGood = false;
      }
    }
    if (ansGood) {
      const soldier = location.state.soldier;
      if (params.ttid === "2") {
        //if its the team test
        sendChosenSoldiers();
      } else if (!previuoslySubmited) {
        //if this is the first submit for the soldier
        axios
          .post(
            `http://localhost:8080/api/tests/fact`,
            [
              soldier.soldier_serial_id,
              params.ttid,
              params.rid,
              new Date().toISOString().slice(0, 10),
              questions,
              Object.values(answers),
              null, //parent batalion id- need to change
              Object.values(comments),
            ],
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
      } else {
        //if the soldiers test is being updated
        let oldFacts = facts;
        oldFacts.map((fact) => {
          let ans = 0;
          questions.map((question) => {
            if (question.id === fact.question_id) ans = answers[question.name];
          });
          fact.score = ans;
        });
        setFacts(oldFacts);
        axios
          .post(
            `http://localhost:8080/api/tests/fact/update`,
            [
              facts,
              Object.values(comments),
              new Date().toISOString().slice(0, 10),
            ],
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
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:8080/api/tests/question/${params.ttid}`, {
          headers: { token: sessionStorage.getItem("token") },
        })
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
        await axios
          .get(
            `http://localhost:8080/api/tests/fact/${sol.soldier_serial_id}/${params.ttid}`,
            { headers: { token: sessionStorage.getItem("token") } }
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
                  if (fact.question_id === question.id) {
                    ans = fact.score;
                  }
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
    })();
  }, [params.ttid, loaded]);

  return (
    <div>
      <NavBar setUser={setUser} user={user} pageName={"תרחיש האימון"} />
      {sol !== undefined ? (
        <Box dir="rtl" sx={{ paddingX: "10%" }}>
          <Typography fontFamily={"Regular"} fontSize={"22px"}>
            {"תרחיש אימון עבור"}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontFamily={"ExtraBold"} fontSize={"22px"}>
              {sol.first_name + " " + sol.last_name}
            </Typography>
            <div>
              <Button
                onClick={() => {
                  navigate(-2);
                }}
                style={{
                  height: "20px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
                  color: "black",
                }}
              >
                <p>החלף מתאמן</p>
              </Button>
            </div>
          </div>

          {params.ttid === "2" ? (
            <div>
              {rolesWithOutCommander.map((role) => {
                return (
                  <div>
                    <SolPopUp
                      setUser={setUser}
                      user={user}
                      role={role}
                      chosenSoldiers={chosenSoldiers}
                      setChosenSoldiers={setChosenSoldiers}
                      soldiers={location.state.soldiers}
                    />
                    <Typography
                      fontFamily={"Regular"}
                      align="Right"
                      color="#000000"
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {chosenSoldiers[role.name] !== undefined
                        ? chosenSoldiers[role.name].first_name +
                          " " +
                          chosenSoldiers[role.name].last_name
                        : undefined}
                    </Typography>
                  </div>
                );
              })}
            </div>
          ) : null}
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "black",
                width: "50%",
                mt: 3,
                mb: 2,
                borderRadius: 30,
                fontFamily: "Bold",
                background:
                  "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
              }}
              id="submit"
              onClick={(e) => handleSubmit(e)}
            >
              שלח
            </Button>
          </Box>
        </Box>
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
