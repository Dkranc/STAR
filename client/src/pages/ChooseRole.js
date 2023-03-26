import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ChooseRole = () => {
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

  const finishTrainingCicked = (e) => {};

  return (
    <div className="test-types">
      <NavBar
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
              fontSize:"20px",
              borderColor:"#2ED573",
              color:"rgb(0,0,0)",
              background:"white",
              boxShadow:"inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
              width: "100%",
              mt:2,
              borderRadius: 30,
              fontFamily: "Bold",
            }}
            onClick={(e) => handleRoleChosen(e)}
            key={role.id}
            value={role.id}
          >
            {role.name}
          </Button>
            // <Button
            //   type="submit"
            //   variant="contained"
            //   sx={{
            //     width: "100%",
            //     mt: 3,
            //     mb: 2,
            //     borderRadius: 30,
            //     fontFamily: "Bold",
            //   }}
            //   color={"success"}
            //   onClick={(e) => handleRoleChosen(e)}
            //   key={role.id}
            //   value={role.id}
            // >
            //   {role.name}
            // </Button>
          );
        })}
        <div id="finish-training">
          <h4>אפשרויות</h4>
          <Button
            variant="outlined"
            sx={{
              // fontSize:"25px",
              color:'black',
              background:'linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)',
              borderColor:"#2ED573",
              boxShadow:"inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
              width: "100%",
              mt:2,
              borderRadius: 30,
              fontFamily: "Bold",
            }}
            onClick={(e) => finishTrainingCicked(e)}
            value={"finishTraining"}
          >
            {"סיום אימון,  שליחת סיכום וחישוב ציונים סופיים"}
          </Button>
          {/* <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              mt: 3,
              mb: 2,
              borderRadius: 30,
              fontFamily: "Bold",
            }}
            color={"success"}
            onClick={(e) => finishTrainingCicked(e)}
            value={"finishTraining"}
          >
            {"סיום אימון,  שליחת סיכום וחישוב ציונים סופיים"}
          </Button> */}

        </div>
      </Box>
    </div>
  );
};

export default ChooseRole;
