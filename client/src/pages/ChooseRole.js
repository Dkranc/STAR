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
  const [roleId, setRoleId] = useState(0);
  const soldier = location.state.soldier;

  useEffect(() => {
    if (roleId !== 0) {
      if (soldier !== undefined) {
        navigate(`/SelectSoldiers/${roleId}/TestType`, {
          state: {
            isMashad: true,
            mashadTests: mashadTests,
            soldier: location.state.soldier,
          },
        });
      } else {
        navigate(`/GeneralInput/ChooseRole/${roleId}/TestType`, {
          state: {
            soldier: undefined,
            mashadTests: mashadTests,
          },
        });
      }
    }
  }, [mashadTests]);

  const handleRoleChosen = (e) => {
    axios
      .get(
        `http://localhost:8080/api/tests/test_types/mashad/${e.target.value}`
      )
      .then((response) => {
        setMashadTests(response.data);
      });
    setRoleId(e.target.value);
  };

  return (
    <div className="test-types">
      <NavBar />
      <h2>
        בחר תפקיד עבור:{" "}
        <span>
          {soldier !== undefined
            ? location.state.soldier.full_name
            : "הזנה כללית"}
        </span>
      </h2>
      {roles.map((role) => {
        return (
          <button
            onClick={(e) => handleRoleChosen(e)}
            key={role.id}
            value={role.id}
          >
            {role.name}
          </button>
        );
      })}
    </div>
  );
};

export default ChooseRole;
