import React from "react";
import {
  CircularProgress,
  Box,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    (async function anyNameFunction() {
        var soldiersArray=[];
      await axios
        .get(`http://localhost:8080/api/general/soldier`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
            soldiersArray=Object.entries(response.data);
          setSoldiers(soldiersArray);
        });
      var checkedSoldiers = {};
      soldiersArray.map((sol) => {
        checkedSoldiers[sol[1].id] = false;
      });
      setCheckedArray(checkedSoldiers);
    })();
  }, []);

  const selectAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to true
      dict2[sol[1].serial_id] = true;
    });

    setCheckedArray(dict2);
  };

  const removeAllClicked = (e) => {
    var dict2 = {};
    soldiers.map((sol) => {
      // this sets the initial checkbox fileds to false
      dict2[sol[1].serial_id] = false;
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
        navigate(`/`);
      });
  };

  const pageName = "בוחן מערים";

  return (
    <div>
      <Box dir="rtl">
        <NavBar
          setUser={setUser}
          user={user}
          pageName={pageName}
          lightMode={lightMode}
        />
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

        {soldiers.map((sol) => {
          return (
            <ListItem
              sx={{ border: "none" }}
              alignItems="flex-end"
              dir={"rtl"}
              key={sol[1].serial_id}
              secondaryAction={
                <input
                  type="checkbox"
                  value={sol[1].serial_id}
                  checked={checkedArray[sol[1].serial_id]}
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
                primary={sol[1].first_name+" "+sol[1].last_name}
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
          marginLeft: "25%",
        }}
        onClick={sendClicked}
      >
        שלח
      </Button>
    </div>
  );
};

export default TestInputGeneral;
