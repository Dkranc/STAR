import React from "react";
import NavBar from "../components/NavBar";
import SelectSoldiers from "./SelectSoldiers";
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import { useNavigate, useLocation } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import GroupAdd from "@mui/icons-material/GroupAddTwoTone";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const AddEditSoldiers = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar user={user} setUser={setUser} pageName={"הוספת חיילים ועריכה"} />
      <SelectSoldiers user={user} addEdit={true} />
      <Box
        sx={{
          position: "fixed",
          margin: "0px",
          top: "auto",
          right: "auto",
          bottom: "20px",
          left: "20px",
        }}
      >
        <Fab
          sx={{
            marginRight: "10px",
            background:
              "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
            borderColor: "#2ED573",
            boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
          }}
          aria-label="add"
        >
          <PersonAddAltOutlinedIcon
            onClick={() => {
              navigate(`/AddEditSoldiers/AddEditPage`);
            }}
          />
        </Fab>
        <Fab
          sx={{
            background:
              "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
            borderColor: "#2ED573",
            boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
          }}
          aria-label="edit"
        >
          <EmojiFlagsIcon
            onClick={() => {
              navigate("/CompanyChoice");
            }}
          />
        </Fab>
      </Box>
    </div>
  );
};

export default AddEditSoldiers;
