import { React, useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "@mui/material/Button";

const EditCompanyPopUp = ({ role, chosenSoldiers, setChosenSoldiers }) => {
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const sendClicked = () => {
    if (company === "") {
      setError(true);
    } else {
      setError(false);
    }

    if (!error) {
    }
  };
  return (
    <Popup
      trigger={
        <Button
          fontFamily={"Bold"}
          color={"success"}
          variant="contained"
          style={{ margin: "20px 15px" }}
        >
          הוספת פרטי פלוגה
        </Button>
      }
      position="bottom center"
      closeOnDocumentClick
    >
      <div>
        <label dir="rtl" htmlFor="companyNum">
          הזן מספר פלוגה לאימון
        </label>
        <input
          name="companyNum"
          dir="rtl"
          type="number"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        <input type="submit" onClick={sendClicked} />
        <h4 stlyle={{ color: "red" }}>{error ? "נא להזין מספר תקין" : null}</h4>
      </div>
    </Popup>
  );
};

export default EditCompanyPopUp;
