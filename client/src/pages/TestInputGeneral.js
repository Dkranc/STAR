import React from "react";
import {
  CircularProgress,
  Box,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import toast from "react-hot-toast";

const TestInputGeneral = ({ user, setUser, lightMode }) => {
  const [soldiers, setSoldiers] = useState([]);
  const [checkedArray, setCheckedArray] = useState(false);
  const [question, setQuestion] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function anyNameFunction() {
      setSoldiers(location.state.soldiers);

      var checkedSoldiers = {};
      soldiers.map((sol) => {
        checkedSoldiers[sol.id] = false;
      });

      setCheckedArray(checkedSoldiers);

      const medTests = ["1", "45", "85", "112"];

      medTests.map(async (qid) => {
        await axios
          .get(`http://localhost:8080/api/tests/fact/questionId/qid/${qid}`, {
            headers: { token: sessionStorage.getItem("token") },
          })
          .then((response) => {
            response.data.map((fact) => {
              const solId = fact.id;
              const val = fact.score != 0 ? true : false;
              // console.log(solId, val);
              checkedSoldiers = { ...checkedSoldiers, [solId]: val };
              setCheckedArray(checkedSoldiers);
            });
          })
          .then(() => {
            setLoading(false);
          });
      });
    })();
  }, [soldiers]);

  const selectAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to true
      dict2[sol.id] = true;
    });

    setCheckedArray(dict2);
  };

  const removeAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to false
      dict2[sol.id] = false;
    });

    setCheckedArray(dict2);
  };

  const checkBoxChanged = async (e) => {
    const val = e.target.value;

    var newSolCompleteList = {
      ...checkedArray,
      [val]: !checkedArray[val],
    };
    setCheckedArray(newSolCompleteList);
  };

  const sendClicked = () => {
    axios
      .post(
        "http://localhost:8080/api/tests/fact/medicalGeneralInput",
        checkedArray,
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((response) => {
        toast.success("הבקשה נשלחה בהצלחה");
        navigate(`/Home`, { state: { soldiers: location.state.soldiers } });
      });
  };

  const pageName = "בוחן מערים";

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Box dir="rtl">
            <NavBar
              setUser={setUser}
              user={user}
              pageName={pageName}
              lightMode={lightMode}
            />
            <Box
              sx={{
                margin: "10%",
                border: "none",
                backgroundColor: "white",
                borderRadius: "30px",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Box
                className="btns-add-rmv"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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

              {soldiers.map((sol) => {
                return (
                  <ListItem
                    sx={{ border: "none" }}
                    alignItems="flex-end"
                    dir={"rtl"}
                    key={sol.id}
                    secondaryAction={
                      <input
                        type="checkbox"
                        value={sol.id}
                        checked={checkedArray[sol.id]}
                        onChange={(e) => checkBoxChanged(e)}
                      />
                    }
                  >
                    <ListItemText
                      sx={{
                        marginRight: "40px",
                        fontFamily: "Bold",
                        textAlign: "right",
                      }}
                      dir={"rtl"}
                      id={sol.id}
                      primary={
                        sol.first_name +
                        " " +
                        sol.last_name +
                        " " +
                        sol.soldier_serial_id
                      }
                    />
                  </ListItem>
                );
              })}
            </Box>
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
                marginRight: "25%",
              }}
              onClick={sendClicked}
            >
              שלח
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default TestInputGeneral;
