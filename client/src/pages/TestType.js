//import react
import { React, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

//import axios
import axios from "axios";

//import custom components
import NavBar from "../components/NavBar";

//import mui
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

/* 
TestType.js - a page for selecting the test for role selected in previous page.
navigate to the questionary depending on test id.
*/
const TestType = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const params = useParams();
  const location = useLocation();
  console.log(location.state.soldiers);

  useEffect(() => {
    if (location.state.isMashad) {
      setTests(location.state.mashadTests);
      setLoaded(true);
    } else {
      axios
        .get(`http://localhost:8080/api/tests/test_types/${params.rid}`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setTests(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const handleTestChosen = (testId) => {
    if (location.state.soldier !== undefined) {
      navigate(`/SelectSoldiers/${params.rid}/TestType/Questionary/${testId}`, {
        state: {
          soldier: location.state.soldier,
          isMashad: location.state.isMashad,
          soldiers: location.state.soldiers,
        },
      });
    } else {
      navigate(
        `/GeneralInput/ChooseRole/${params.rid}/TestType/Questionary/${testId}`,
        {
          state: {
            soldier: undefined,
            soldiers: location.state.soldiers,
          },
        }
      );
    }
  };

  return (
    <div className="test-types">
      <NavBar
        setUser={setUser}
        user={user}
        pageName={`בחר מבחן עבור: ${
          location.state.soldier !== undefined
            ? location.state.soldier.first_name +
              " " +
              location.state.soldier.last_name
            : "בחר מבחן כללי"
        }`}
      />
      {loaded ? (
        tests.map((test) => {
          return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => handleTestChosen(test.id)}
                // className="test-type-btn"
                type="submit"
                variant="outlined"
                sx={{
                  marginX: "10%",
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
                color={"success"}
                key={test.id}
                value={test.name}
              >
                {test.name}
              </Button>
            </Box>
          );
        })
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="success" />
        </Box>
      )}
    </div>
  );
};

export default TestType;
