import { React, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./SelectSoldiers.css";
import NavBar from "../components/NavBar";

//mui import
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";


const SelectSoldiers = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [solName, setSolName] = useState("");
  const [soldier, setSoldier] = useState(0);
  const location = useLocation();
  const pageName="חיפוש מתאמן"
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/general/soldier`,{headers:{token:sessionStorage.getItem('token')}}).then((response) => {
      setSoldiers(Object.entries(response.data));
      if (soldier !== 0) {
        if (Object.keys(params).length > 0) {
          navigate(`/SelectSoldiers/${params.rid}/TestType`, {
            state: {
              soldier: soldier,
            },
          });
        } else {
          //we are in the mashad selection------------need to first choose role!!!
          navigate(`/MyTrainees/ChooseRole`, {
            state: {
              soldier: soldier,
            },
          });
        }
      }
    });
  }, [soldier]);

  const handleChoice = (e) => {
    for (var sol in soldiers) {
      if (soldiers[sol][1].full_name === e.target.textContent.trim()) {
        setSoldier(soldiers[sol][1]);
      }
    }
  };

  const handleGeneralInput = (e) => {
    navigate(`/GeneralInput/ChooseRole`, {
      state: {
        generalInput: true,
      },
    });
  };

  return (
    <div className="soldier-select">
      <NavBar pageName={pageName}/>
      {/* <input
        dir="rtl"
        value={solName}
        onChange={(e) => setSolName(e.target.value)}
        type="text"
      /> */}
    <Box
    
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
    <TextField
    sx={{radius:'30px'}}
    dir="rtl"
      label=""
      value={solName}
      onChange={(e) => setSolName(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
    </Box>

      <ul dir="rtl">
        {soldiers
          .filter((sol) => {
            //fiter acording to the name of soldier
            return solName === "" ? sol : sol[1].full_name.includes(solName);
          })
          .map((sol) => {
            return (
              <li
                key={sol[1].id}
                onClick={(e) => handleChoice(e)}
                style={{ fontWeight: "bold" }}
              >
                <span>{sol[1].full_name}</span>
                <span>{sol[1].serial_id}</span>
              </li>
            );
          })}
      </ul>
      <div>
        {params.rid === undefined ? (
            <Box
             sx={{
              padding:'16px',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
           <Button fontFamily={"Bold"} color={"success"}
 variant="contained" type="submit" onClick={(e) => handleGeneralInput(e)}>הזנה כללית ע״פ תפקיד</Button>
            </Box>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectSoldiers;
