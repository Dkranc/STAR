import React from "react";
import NavBar from "../components/NavBar";
import SelectSoldiers from "./SelectSoldiers";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import EditCompanyPopUp from "../components/EditCompanyPopUp";
import { useNavigate, useLocation } from "react-router-dom";

const AddEditSoldiers = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar user={user} setUser={setUser} pageName={"הוספת חיילים ועריכה"} />
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
        <Button
          fontFamily={"Bold"}
          color={"success"}
          variant="contained"
          style={{ margin: "20px 15px" }}
          onClick={() => {
            navigate("/CompanyChoice");
          }}
        >
          הוספת פרטי פלוגה
        </Button>
      </div>

      <SelectSoldiers user={user} addEdit={true} />
    </div>
  );
};

export default AddEditSoldiers;
