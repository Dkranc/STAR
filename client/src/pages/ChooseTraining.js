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
  const updateAppData = (key, value) => {
    appData[key] = value;
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    setTraining(event.target.value);
  };
  const onClick = async () => {
    await axios
      .get(`http://localhost:8080/api/general/soldier/training/${training}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        updateAppData("soldiers", response.data);
        console.log("ChooseTraining appData: ", appData);
        window.sessionStorage.setItem("appData", JSON.stringify(appData));

        navigate("Home", {
          user: user,
          setUser: setUser,
        });
      });
  };
  return (
    <Box>
      <NavBar user={user} setUser={setUser} pageName={"בחר אימון"} />
      <FormControl fullWidth>
        <InputLabel id="demo-select-small-label">Training</InputLabel>
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
        <Button onClick={onClick}>הבא</Button>
      </FormControl>
    </Box>
  );
};

export default ChooseTraining;
