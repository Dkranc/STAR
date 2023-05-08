import React, { useState } from "react";
import GeneralInput from "./GeneralInput";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChooseTraining = ({ user, setUser }) => {
  const [training, setTraining] = React.useState(0);
  const [soldiers, setSoldiers] = React.useState([]);
  const [appData, setAppData] = useState({});
  const [error, setError] = useState("");
  const updateAppData = (key, value) => {
    appData[key] = value;
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    setTraining(event.target.value);
  };
  const onClick = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:8080/api/general/soldier/training/${training}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          navigate(`/Home`, {
            state: {
              soldiers: response.data,
            },
          });
        } else {
          setError("אין מידע להצגה");
        }
      });
  };
  return (
    <Box>
      <NavBar user={user} setUser={setUser} pageName={"בחר אימון"} />
      <FormControl fullWidth >
       { <InputLabel  id="demo-select-small-label">Training</InputLabel>}
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={training}
          label="Training"
          onChange={handleChange}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
        <Button         sx={{
          background:
            "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
          boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
          color: "black",
          fontFamily: "Bold",
          fontSize: "20px",
          paddingX: "20%",
          borderRadius: "30px",
          marginTop: "20px",

        }} onClick={(e) => onClick(e)}>הבא</Button>
        {error.length !== 0 ? <h3 style={{color:'red'}} dir="rtl">{error}</h3> : null}
      </FormControl>
    </Box>
  );
};

export default ChooseTraining;
