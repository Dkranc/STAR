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
      width: 250,
    },
  },
};

const companies = ["א", "ב", "ג", "ד", "ה"];

export default function DropDownCompany() {
  const theme = useTheme();
  const [companyName, setCompanyName] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event: SelectChangeEvent<typeof companyName>) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setCompanyName(
      // On autofill we get a stringified value.
      event.target.value
    );
  };

  return (
    <Box dir="rtl">
      <FormControl dir="ltr" sx={{ m: 1 }}>
        <Select
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
}
