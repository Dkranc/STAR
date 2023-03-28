import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

const AddEditPage = () => {
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
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar pageName={"הוספת/עריכת פרטי חייל"} />

      {Object.entries(soldier).map(([key, value]) => {
        if (key != "id")
          return (
            <input
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
            />
          );
      })}

      <p dir="rtl" style={{ color: "red" }}>
        {" "}
        {error ? "שגיאה, נא מלאו כל השדות כנדרש" : null}{" "}
      </p>

      <button onClick={sendClicked}>
        {soldier.id != null ? "עדכן" : "הוסף"}
      </button>
    </div>
  );
};

export default AddEditPage;
