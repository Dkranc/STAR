import { React, useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { FilledInput } from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      //   width: 30,
      m: 1,
    },
  },
};

const companies = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
];

const DropDownCompany = ({ question, questions, handleQuestionChange }) => {
  console.log(questions);
  const theme = useTheme();
  const [companyName, setCompanyName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setCompanyName(
      // On autofill we get a stringified value.
      event.target.value
    );
    const newQuestions = questions.slice(); //copy the array
    newQuestions[question.id - 1].plooga_name = event.target.value; //execute the manipulations
    handleQuestionChange(newQuestions); //set the new state
  };

  return (
    <Box dir="rtl">
      <FormControl dir="rtl" sx={{ m: 1 }}>
        <Select
          MenuProps={MenuProps}
          multiple={false}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={companyName}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: "white",
                borderRadius: "30px",
              }}
              size="small"
              dir="rtl"
              label=""
            />
          }
          MenuProps={MenuProps}
        >
          {companies.map((name) => (
            <MenuItem dir="rtl" key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default DropDownCompany;
