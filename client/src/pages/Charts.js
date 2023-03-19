import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// import "./Charts.css";

const Charts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const user = location.state.user;
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/fact/rid/rid/${params.rid}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <div id="charts"></div>;
};

export default Charts;
