import React from "react";
import NavBar from "../components/NavBar";
import SelectSoldiers from "./SelectSoldiers";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import EditCompanyPopUp from "../components/EditCompanyPopUp";
import { useNavigate, useLocation } from "react-router-dom";

const AddEditSoldiers = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar pageName={"הוספת חיילים ועריכה"} />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        id="addEditNavButtons"
      >
        <Button
          fontFamily={"Bold"}
          color={"success"}
          variant="contained"
          style={{ margin: "20px 15px" }}
          onClick={() => {
            navigate(`/AddEditSoldiers/AddEditPage`);
          }}
        >
          <PersonAddAlt1Icon />
        </Button>

        <EditCompanyPopUp/>

      </div>

      <SelectSoldiers addEdit={true} />
    </div>
  );
};

export default AddEditSoldiers;
