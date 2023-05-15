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
    location.state.soldier != null
      ? location.state.soldier
      : {
          id: null,
          soldier_serial_id: null,
          first_name: null,
          last_name: null,
          pluga: null,
          role: null,
          week_number: null,
          mail: null,
        }
  );

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const abc = "אבגדהוזחטיכלמנסעפצקרשת";

  const sendClicked = () => {
    console.log(parseInt(soldier.role) < 1 ,
    parseInt(soldier.role) > 4 );

    let inputError =
      soldier.soldier_serial_id === null ||
      soldier.first_name === null ||
      soldier.last_name === null ||
      soldier.pluga === null ||
      soldier.role === null ||
      soldier.week_number === null ||
      soldier.soldier_serial_id.length < 7 ||
      soldier.soldier_serial_id.length > 8 ||
      soldier.pluga.length !== 1 ||
      parseInt(soldier.role) < 1 ||
      parseInt(soldier.role) > 4 ||
      !abc.includes(soldier.pluga);

    if (inputError) {
      setError(true);
    } else setError(false);

    if (!inputError) {
      if (soldier.id === null) {
        axios.post(
          `http://localhost:8080/api/general/soldier`,
          [
            soldier.soldier_serial_id,
            soldier.first_name,
            soldier.last_name,
            soldier.pluga,
            soldier.role,
            soldier.week_number,
            soldier.mail,
          ],
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
      } else {
        axios.put(
          `http://localhost:8080/api/general/soldier/${soldier.id}`,
          [
            soldier.soldier_serial_id,
            soldier.first_name,
            soldier.last_name,
            soldier.pluga,
            soldier.role,
            soldier.week_number,
            soldier.mail,
          ],
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        );
      }
      toast.success("הבקשה נשלחה בהצלחה");
      navigate("/Home", {
        state: {
          soldiers: location.state.soldiers,
        },
      });
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
                  key === "soldier_serial_id"
                    ? "מספר אישי"
                    : key === "first_name"
                    ? "שם פרטי"
                    : key === "last_name"
                    ? "שם משפחה"
                    : key === "role"
                    ? "מספר תפקיד (1-4)"
                    : key === "mail"
                    ? "e-mail"
                    : key === "week_number"
                    ? "מספר שבוע אימון (1-4)"
                    : "פלוגה (א-ת)  "
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
