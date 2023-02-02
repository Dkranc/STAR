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
    axios
      .get(`http://localhost:8080/api/tests/test_types/${params.rid}`)
      .then((response) => {
        setTests(response.data);
        setLoaded(true);
      });
  }, [loaded]);

  return (
    <div className="test-types">
      <NavBar />
      <h2>בחר מבחן עבור: <span>{location.state.soldier.full_name}</span></h2>
      {loaded ? (
        tests.map((test) => {
          return (
            <button
              onClick={() =>
                navigate(
                  `/SelectSoldiers/${params.rid}/TestType/Questionary/${test.id}`,
                  { state: { soldier: location.state.soldier } }
                )
              }
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
