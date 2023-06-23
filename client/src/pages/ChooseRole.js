//import react
import { React, useEffect, useState } from "react";
import { useNavigate, useLocation,redirect } from "react-router-dom";

//import axios
import axios from "axios";

//import custom components
import NavBar from "../components/NavBar";
import toast from "react-hot-toast";

//import mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
/*
ChooseRole.js - choose the rule for tests and navigate to choose soldier 
by setting role.id and in use effect navigate to path.
*/
const ChooseRole = ({ user, setUser }) => {
  const roles = [
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [mashadTests, setMashadTests] = useState([]);
  const [roleId, setRoleId] = useState(0);
  const soldier = location.state.soldier;

  useEffect(() => {
    if (roleId !== 0) {
      //1 - 1, 2 - 10, 3 - 13, 4 - 6 paramas - testid relation to mashad test
      let testId = 0;
      console.log("ismashad", location.state.isMashad);

      if (location.state.isMashad) {
        switch (roleId) {
          case "1":
            testId = "1";
            break;
          case "2":
            testId = "10";
            break;
          case "3":
            testId = "13";
            break;
          case "4":
            testId = "6";
            break;
        }
        return navigate(
          `/SelectSoldiers/${roleId}/TestType/Questionary/${testId}`,
          {
            state: {
              soldier: location.state.soldier,
              isMashad: location.state.isMashad,
              soldiers: location.state.soldiers,
            },
          }
        );
      }
      if (soldier !== undefined) {
        if (soldier !== null) {
          console.log("delete:1");
          navigate(`/SelectSoldiers/${roleId}/TestType`, {
            state: {
              isMashad: location.state.isMashad,
              mashadTests: mashadTests,
              soldier: location.state.soldier,
              soldiers: location.state.soldiers,
            },
          });
        } else {
          //in case of reports page
          navigate(`/Charts/${roleId}/Graphs`, {
            state: {
              isMashad: location.state.isMashad,
              soldier: location.state.user,
              soldiers: location.state.soldiers,
            },
          });
        }
      } else {
        navigate(`/GeneralInput/ChooseRole/${roleId}/TestType`, {
          state: {
            isMashad: location.state.isMashad,
            soldier: undefined,
            mashadTests: mashadTests,
            soldiers: location.state.soldiers,
          },
        });
      }
    }
  }, [mashadTests]);

  const handleRoleChosen = (e) => {
    setRoleId(e.target.value);

    axios
      .get(
        `http://localhost:8080/api/tests/test_types/mashad/${e.target.value}`,
        { headers: { token: sessionStorage.getItem("token") } }
      )
      .then((response) => {
        setMashadTests(response.data);
      });
    setRoleId(e.target.value);
  };

  const finishTrainingCicked = (e) => {
    const training = location.state.soldiers[0].week_number;

    axios
      .post(`http://localhost:8080/api/tests/fact/calcFinalGrade`, {
        training: training,
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response, err) => {
        if (err) console.log(err);

        const errorWithSending = response.data;
        if (response.status === 200) {
          toast.success("האימון הסתיים! הדוחות נשלחו בהצלחה");
          navigate(`/TrainingEnded`,{state:{soldiers:location.state.soldiers, failedToSend:errorWithSending} });

        } else {
          
          toast.alert("אירעה שגיאה, נא לפנות לעזרה");
          navigate(`/Home`, {
            state: {
              soldiers: location.state.soldiers,
            },
          });
        }
      });
  };

  const medicalTestClicked = (e) => {
    const medTestId = 1; // now is hard coded but can be any id
    navigate(`/SpecificTestInput/${medTestId}`, {
      state: {
        soldiers: location.state.soldiers,
      },
    });
  };

  return (
    <div className="test-types">
      <NavBar
        user={user}
        setUser={setUser}
        pageName={`בחר תפקיד עבור: ${
          soldier !== undefined
            ? soldier == null
              ? "דוחות"
              : location.state.soldier.first_name +
                " " +
                location.state.soldier.last_name
            : "הזנה כללית"
        }`}
      />
      <Box
        sx={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {roles.map((role) => {
          return (
            <Button
              variant="outlined"
              sx={{
                fontSize: "20px",
                borderColor: "#2ED573",
                color: "rgb(0,0,0)",
                background: "white",
                boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
                width: "100%",
                mt: 2,
                borderRadius: 30,
                fontFamily: "Bold",
              }}
              onClick={(e) => handleRoleChosen(e)}
              key={role.id}
              value={role.id}
            >
              {role.name}
            </Button>
          );
        })}

        {soldier !== undefined ? (
          soldier == null ? (
            <div
              style={{ fontSize: "20px", fontFamily: "Bold" }}
              id="finish-training"
            >
              <center>
                <h4 style={{ backgroundColor: "transparent" }}>:סיום האימון</h4>
                <p style={{ fontSize: "18px" }}>
                  בלחיצה על כפתור סיום אימון, יחושבו הציונים הסופיים של האימון
                  וישלחו לחיילים מיילים עם ציוניהם הסופיים
                </p>
              </center>
              <Button
                variant="outlined"
                sx={{
                  fontSize: "20px",
                  borderColor: "#2ED573",
                  color: "rgb(0,0,0)",
                  background:
                    "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
                  boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
                  width: "100%",
                  mt: 2,
                  borderRadius: 30,
                  fontFamily: "Bold",
                }}
                onClick={(e) => finishTrainingCicked(e)}
              >
                {"סיום אימון"}
              </Button>
            </div>
          ) : (
            ""
          )
        ) : (
          <Button
            variant="outlined"
            sx={{
              fontSize: "20px",
              borderColor: "#2ED573",
              color: "rgb(0,0,0)",
              background: "white",
              boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
              width: "100%",
              mt: 2,
              borderRadius: 30,
              fontFamily: "Bold",
            }}
            onClick={(e) => medicalTestClicked(e)}
          >
            הזנת בוחן מערים כללי
          </Button>
        )}
      </Box>
    </div>
  );
};

export default ChooseRole;
