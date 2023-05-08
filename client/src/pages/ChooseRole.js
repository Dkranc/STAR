import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import toast from "react-hot-toast";
//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
      if (soldier !== undefined) {
        if (soldier !== null) {
          navigate(`/SelectSoldiers/${roleId}/TestType`, {
            state: {
              isMashad: true,
              mashadTests: mashadTests,
              soldier: location.state.soldier,
            },
          });
        } else {
          //in case of reports page
          navigate(`/Charts/${roleId}/Graphs`, {
            state: { soldier: location.state.user },
          });
        }
      } else {
        navigate(`/GeneralInput/ChooseRole/${roleId}/TestType`, {
          state: {
            soldier: undefined,
            mashadTests: mashadTests,
          },
        });
      }
    }
  }, [mashadTests]);

  const handleRoleChosen = (e) => {
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
    axios
      .put(`http://localhost:8080/api/tests/fact/calcFinalGrade`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        toast.success("האימון הסתיים! הדוחות נשלחו בהצלחה")
        navigate("/");
      });
  };

  const medicalTestClicked=(e)=>{
    const medTestId= 1// now is hard coded but can be any id
    navigate(`/SpecificTestInput/${medTestId}`)
  }

  return (
    <div className="test-types">
      <NavBar
        user={user}
        setUser={setUser}
        pageName={`בחר תפקיד עבור: ${
          soldier !== undefined
            ? soldier == null
              ? "דוחות"
              : location.state.soldier.full_name
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
        ) :  <Button
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
      </Button>}
      </Box>
    </div>
  );
};

export default ChooseRole;
