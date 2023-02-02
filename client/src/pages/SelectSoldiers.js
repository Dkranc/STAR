import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./SelectSoldiers.css";
import NavBar from "../components/NavBar";

const SelectSoldiers = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [solName, setSolName] = useState("");
  const [soldier, setSoldier] = useState(0);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/general/soldier`).then((response) => {
      setSoldiers(Object.entries(response.data));
      if (soldier!==0){
        if (Object.keys(params).length>0){
        navigate(`/SelectSoldiers/${params.rid}/TestType`, {
          state: {
            soldier: soldier,
          },
        });
      }
      else{//we are in the mashad selection------------need to first choose role!!!
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

  return (
    <div className="soldier-select">
    <NavBar/>
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
              <li key={sol[1].id} onClick={(e) => handleChoice(e)}>
                {sol[1].full_name}
                <CheckCircleIcon /> {/*רק אם ביצע*/}{" "}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SelectSoldiers;
