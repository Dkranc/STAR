import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import toast from "react-hot-toast";

const AddEditPage = ({ user, setUser }) => {
  const location = useLocation();
  /** set the soldiers value if were in edit stage , null if were adding a new one */
  const [soldier, setSoldier] = useState(
    location.state !== null
      ? location.state.soldier
      : { id: null, serial_id: null, full_name: null, company: null }
  );
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const sendClicked = () => {
    if (
      soldier.serial_id === null ||
      soldier.full_name === null ||
      soldier.company === null
    )
      setError(true);
    else setError(false);
    if (!error) {
      if (soldier.id === null) {
        axios.post(
          `http://localhost:8080/api/general/soldier`,
          [soldier.serial_id, soldier.full_name, soldier.company],
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
      } else {
        axios.put(
          `http://localhost:8080/api/general/soldier/${soldier.id}`,
          [soldier.serial_id, soldier.full_name, soldier.company],
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
      }
      toast.success("הבקשה נשלחה בהצלחה");
      navigate("/");
    }
  };

  return (
    <Box fontFamily={"Bold"}>
      <NavBar
        setUser={setUser}
        user={user}
        pageName={"הוספת/עריכת פרטי חייל"}
      />

      {Object.entries(soldier).map(([key, value]) => {
        if (key != "id")
          return (
            <Box display={"flex"}>
              <TextField
                sx={{
                  fontFamily: "Bold",
                  marginY: "5px",
                  marginX: "10%",
                  width: "100%",
                  marginX: "10%",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
                size="small"
                dir="rtl"
                value={value}
                onChange={(e) =>
                  setSoldier({ ...soldier, [key]: e.target.value })
                }
                placeholder={
                  key === "serial_id"
                    ? "מספר אישי"
                    : key === "full_name"
                    ? "שם מלא"
                    : "פלוגה"
                }
                type="text"
                name={key}
                required
              />{" "}
            </Box>
          );
      })}

      <p dir="rtl" style={{ color: "red" }}>
        {" "}
        {error ? "שגיאה, נא מלאו כל השדות כנדרש" : null}{" "}
      </p>
      <Box display="flex">
        <Button
          onClick={sendClicked}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginX: "30%",
            color: "black",
            background:
              "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
            borderRadius: 30,
            fontFamily: "Bold",
            fontSize: "15px",
          }}
        >
          {soldier.id != null ? "עדכן" : "הוסף"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditPage;
