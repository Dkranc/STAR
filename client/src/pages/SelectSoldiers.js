import { React, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./SelectSoldiers.css";
import NavBar from "../components/NavBar";

const SelectSoldiers = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [solName, setSolName] = useState("");
  const [soldier, setSoldier] = useState(0);
  const location = useLocation();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/general/soldier`).then((response) => {
      setSoldiers(Object.entries(response.data));
      if (soldier !== 0) {
        if (Object.keys(params).length > 0) {
          navigate(`/SelectSoldiers/${params.rid}/TestType`, {
            state: {
              soldier: soldier,
            },
          });
        } else {
          //we are in the mashad selection------------need to first choose role!!!
          navigate(`/MyTrainees/ChooseRole`, {
            state: {
              soldier: soldier,
            },
          });
        }
      }
    });
  }, [soldier]);

  const handleChoice = (e) => {
    for (var sol in soldiers) {
      if (soldiers[sol][1].full_name === e.target.textContent.trim()) {
        setSoldier(soldiers[sol][1]);
      }
    }
  };

  const handleGeneralInput = (e) => {
    navigate(`/GeneralInput/ChooseRole`, {
      state: {
        generalInput: true,
      },
    });
  };

  return (
    <div className="soldier-select">
      <NavBar />
      <h1>נא לבחור מתאמן</h1>
      <input
        dir="rtl"
        value={solName}
        onChange={(e) => setSolName(e.target.value)}
        type="text"
      />
      <ul dir="rtl">
        {soldiers
          .filter((sol) => {
            //fiter acording to the name of soldier
            return solName === "" ? sol : sol[1].full_name.includes(solName);
          })
          .map((sol) => {
            return (
              <li
                key={sol[1].id}
                onClick={(e) => handleChoice(e)}
                style={{ fontWeight: "bold" }}
              >
                <span>{sol[1].full_name}</span>
                <span>{sol[1].serial_id}</span>
              </li>
            );
          })}
      </ul>
      <div>
        {params.rid === undefined ? (
          <button onClick={(e) => handleGeneralInput(e)}>
            הזנה כללית לפי תפקיד
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectSoldiers;
