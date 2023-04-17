import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectSoldiers from "../pages/SelectSoldiers";
import { Autocomplete, TextField, Collapse, Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const SolPopUp = ({
  setUser,
  user,
  role,
  chosenSoldiers,
  setChosenSoldiers,
}) => {
  const [openSelected, setOpenSelected] = useState(false);

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: "white",
        borderRadius: "30px",
        border: "none",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Button
        endIcon={openSelected ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        style={{ fontFamily: "Regular" }}
        sx={{
          fontSize: "20px",
          color: "black",
          backgroundColor: "white",
          marginY: "5%",
          radius: "15px",
          display: "flex",
          justifyContent: "space-between",
          display: "flex",
        }}
        onClick={() => setOpenSelected(!openSelected)}
      >
        בחר תפקיד עבור: {role}
      </Button>
      <Collapse
        orientation={"vertical"}
        in={openSelected}
        timeout="auto"
        unmountOnExit
      >
        <SelectSoldiers
          user={user}
          setUser={setUser}
          setChosenSoldiers={setChosenSoldiers}
          chosenSoldiers={chosenSoldiers}
          role={role}
          setCollapse={setOpenSelected}
        />
        {console.log(chosenSoldiers)}
      </Collapse>
    </Box>
  );
};

export default SolPopUp;
