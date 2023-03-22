import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

// import "./Charts.css";

const Charts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const user = location.state.user;
  const [facts, setFacts] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/fact/rid/rid/${params.rid}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setFacts(res.data);
        if (res.data.length === 0) setNoData(true);
      });
    if (!noData)
      axios
        .get(`http://localhost:8080/api/tests/test_types`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((res) => {
          setTestTypes(
            res.data.filter((item) => {
              return item.role_id === parseInt(params.rid);
            })
          );
        });
    if (!noData)
      setData(
        testTypes.map((test) => {
          return {
            name: test.name.slice(0, 17),
            נבחנו: getNumOfTests(test.id),
            ממוצע: data === 0 ? calcAvg(test.id) : 0,
          };
        })
      );
    if (data !== 0) setLoading(false);
  }, [testTypes]);

  const calcAvg = (testTypeId) => {
    //need to use the grade formula for each test type
    var sum = 0;
    var count = 0;

    if (data === 0)
      axios
        .get(`http://localhost:8080/api/tests/question/${testTypeId}`, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          res.data.map((question) => {
            facts.map((fact) => {
              if (question.id === fact.question_id && question.weight !== 0) {
                //if the fact matches a question with a weight
                sum += fact.score * question.weight;
                count++;
              }
            });
          });
        });

    console.log(count);
    return count !== 0 ? sum / count : count;
  };

  const getNumOfTests = (testTypeId) => {
    //need to count test types not facts
    var sols = [];
    facts.map((fact) => {
      if (fact.test_type_id === testTypeId) {
        if (!sols.includes(fact.soldier_serial_id)) {
          sols.push(fact.soldier_serial_id);
        }
      }
    });
    return sols.length;
  };

  return (
    <div id="charts" style={{ width: "100%" }}>
      <NavBar roleId={params.rid} />
      <h3 dir="rtl">טבלת הספק</h3>
      {loading ? (
        "loading..."
      ) : noData ? (
        <h2>אין מידע להצגה</h2>
      ) : (
        <ResponsiveContainer width="95%" height={400}>
          <BarChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="נבחנו" fill="#8884d8" />
            <Bar dataKey="ממוצע" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Charts;
