import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const ChooseRole = () => {
  const [roles, setRoles] = useState([
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const [mashadTests, setMashadTests] = useState([]);

  useEffect(() => {
    axios.post(); //need to get tests that match the mashad tests, and then only can we send the user to answer the questions with testtypeid
    /*  navigate(
    `/SelectSoldiers/${role.id}/TestType/Questionary/${test.id}`,
    { state: { soldier: location.state.soldier } }
  )*/
  }, []);

  const handleRoleChosen = (e) => {};

  return (
    <div className="test-types">
      <NavBar />
      <h2>
        בחר תפקיד עבור: <span>{location.state.soldier.full_name}</span>
      </h2>
      {roles.map((role) => {
        return (
          <button onClick={(e) => handleRoleChosen(e)} key={role.id}>
            {role.name}
          </button>
        );
      })}
    </div>
  );
};

export default ChooseRole;
