import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectSoldiers from "../pages/SelectSoldiers";
import { Autocomplete, TextField, Collapse, Button } from "@mui/material";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectPluga = ({ pluga, setPluga }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setPluga(event.target.value);
  };

  return (
    <Box sx={{ direction: "rtl", minWidth: "120px" }}>
      <FormControl fullWidth>
        {<InputLabel id="demo-select-small-label"></InputLabel>}
        <Select
          direction="rtl"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pluga ? pluga : "all"}
          label=""
          onChange={handleChange}
        >
          <MenuItem sx={{ direction: "rtl", paddingX: "10%" }} value={"all"}>
            כולם
          </MenuItem>
          <MenuItem sx={{ direction: "rtl", paddingX: "10%" }} value={"א"}>
            א
          </MenuItem>
          <MenuItem sx={{ direction: "rtl", paddingX: "10%" }} value={"ב"}>
            ב
          </MenuItem>
          <MenuItem sx={{ direction: "rtl", paddingX: "10%" }} value={"ג"}>
            ג
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPluga;
