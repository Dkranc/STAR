import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const TestType = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state.isMashad || location.state.soldier === undefined) {
      setTests(location.state.mashadTests);
      setLoaded(true);
    } else {
      axios
        .get(`http://localhost:8080/api/tests/test_types/${params.rid}`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((response) => {
          setTests(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const handleTestChosen = (testId) => {
    if (location.state.soldier !== undefined) {
      navigate(`/SelectSoldiers/${params.rid}/TestType/Questionary/${testId}`, {
        state: {
          soldier: location.state.soldier,
          isMashad: location.state.isMashad,
        },
      });
    } else {
      navigate(
        `/GeneralInput/ChooseRole/${params.rid}/TestType/Questionary/${testId}`,
        {
          state: {
            soldier: undefined,
          },
        }
      );
    }
  };

  return (
    <div className="test-types">
      <NavBar />
      {location.state.soldier !== undefined ? (
        <h2>
          בחר מבחן עבור: <span>{location.state.soldier.full_name}</span>
        </h2>
      ) : (
        <h2>בחר מבחן כללי לביצוע</h2>
      )}

      {loaded ? (
        tests.map((test) => {
          return (
            <button
              onClick={() => handleTestChosen(test.id)}
              className="test-type-btn"
              key={test.id}
              value={test.name}
            >
              {test.name}
            </button>
          );
        })
      ) : (
        <p>loding...</p>
      )}
    </div>
  );
};

export default TestType;
