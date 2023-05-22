import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CircularProgress, Box, Typography } from "@mui/material";
import NoGraphToShow from "../components/NoGraphToShow";
import DataTable from "../components/DataTable";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
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
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import SelectPluga from "../components/SelectPluga";

// import "./Charts.css";

const Charts = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  //const user = location.state.user;
  const [pluga, setPluga] = useState("");
  const [facts, setFacts] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sizeOfPluga, setSizeOfPluga] = useState(1);

  useEffect(() => {
    var filteredSoldiers = location.state.soldiers.filter((soldier) => {
      return (
        (soldier.role === parseInt(params.rid) && soldier.pluga === pluga) ||
        (soldier.role === parseInt(params.rid) && pluga == "all")
      );
    });
    //use effect when pluga name change, change table and char data.
    setRows(
      filteredSoldiers.map((soldier) => {
        return {
          id: soldier.id,
          name: soldier.first_name + " " + soldier.last_name,
          soldier_serial_id: soldier.soldier_serial_id,
          pluga: soldier.pluga,
        };
      })
    );
    //map plugaArr
    var plugaArr = [];
    facts.map((fact) => {
      var filteredSoldiers = location.state.soldiers
        .filter((soldier) => {
          return (
            (fact.soldier_serial_id == soldier["soldier_serial_id"] &&
              soldier["pluga"] == pluga) ||
            pluga == "all"
          );
        })
        .map((soldier) => {
          plugaArr.push(soldier["soldier_serial_id"]);
        });

      console.log("pluga ", pluga, plugaArr);
    });

    //set the chart data
    setData(
      testTypes.map((test) => {
        return {
          name: test.name.includes("מאמן")
            ? test.name.slice(17, 30)
            : test.name.slice(0, 17),
          נבחנו: getNumOfTests(test.id, plugaArr),
          כולם: new Set(plugaArr).size,
          // ממוצע: calcAvg(test.id) ? calcAvg(test.id) : 4,
        };
      })
    );
    //set agian the rows for table
  }, [pluga]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/fact/rid/rid/${params.rid}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        setFacts(res.data);
        if (res.data.length === 0) setNoData(true);
      });
    if (testTypes.length === 0) {
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
    }
    if (!noData) {
      var filteredSoldiers = location.state.soldiers.filter((soldier) => {
        return (
          (soldier.role === parseInt(params.rid) && soldier.pluga === pluga) ||
          (soldier.role === parseInt(params.rid) && pluga == "all")
        );
      });
      console.log(filteredSoldiers);
      setData(
        testTypes.map((test) => {
          return {
            name: test.name.includes("מאמן")
              ? test.name.slice(17, 30)
              : test.name.slice(0, 17),
            נבחנו: getNumOfTests(test.id, []),
            כולם: rows.length,

            // ממוצע: calcAvg(test.id) ? calcAvg(test.id) : 4,
          };
        })
      );
    }

    if (testTypes.length !== 0) setLoading(false);
    setDataForTable();
  }, [testTypes]);

  const setDataForTable = () => {
    setRows(
      location.state.soldiers
        .filter((soldier) => {
          return soldier.role === parseInt(params.rid);
        })
        .map((soldier) => {
          return {
            id: soldier.id,
            name: soldier.first_name + " " + soldier.last_name,
            soldier_serial_id: soldier.soldier_serial_id,
            pluga: soldier.pluga,
          };
        })
    );

    testTypes.map((test) => {
      console.log(test);
    });

    testTypes.map((test) => {
      console.log(test.name);
      return { field: test.name, headerName: test.name, width: 100 };
    });

    setColumns([
      { field: "name", headerName: "שם החייל", width: 110 },
      { field: "soldier_serial_id", headerName: "מספר אישי", width: 90 },
      { field: "pluga", headerName: "פלוגה", width: 50 },
      {
        field: "test1",
        headerName: "בוחן צוות",
        sortable: false,
        width: 70,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              {false ? <CheckIcon /> : <ClearIcon />}
            </div>
          );
        },
      },
    ]);
  };

  const getNumOfTests = (testTypeId, plugaArr) => {
    //need to count test types not facts
    //get plugaArr the soldiers id in the pluga choosen
    var sols = [];
    facts.map((fact) => {
      if (
        (fact.test_type_id === testTypeId &&
          plugaArr.includes(Number(fact.soldier_serial_id))) ||
        (fact.test_type_id === testTypeId && plugaArr.length === 0) //if plugaArr empty give all
      ) {
        if (!sols.includes(fact.soldier_serial_id)) {
          sols.push(fact.soldier_serial_id);
        }
      }
    });
    console.log("sols", sols.length);
    return sols.length;
  };

  return (
    <Box id="charts" style={{ width: "100%" }}>
      <NavBar
        user={user}
        setUser={setUser}
        pageName={"טבלאות הספק"}
        roleId={params.rid}
      />
      <Box
        width="80%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginX: "10%",
          marginY: "10px",
          direction: "rtl",
        }}
      >
        <Typography
          sx={{
            fontWeight: "Bold",
            fontSize: "22px",
            marginX: "5%",
          }}
        >
          בחר פלוגה:
        </Typography>
        <SelectPluga
          pluga={pluga}
          setPluga={setPluga}
          sx={{
            margin: "10%",
            direction: "rtl",
          }}
        />
      </Box>

      {loading ? (
        <Box
          sx={{
            padding: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : noData ? (
        <NoGraphToShow />
      ) : (
        <Box
          sx={{
            paddingRight: "20px",
          }}
        >
          <ResponsiveContainer
            width="100%"
            minHeight={400}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <BarChart
              minWidth={400}
              minHeight={200}
              data={data}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis type="number" orientation="bottom" />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={true}
                dx={0}
                tickLine={true}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="נבחנו" fill="#8884d8" />
              <Bar dataKey="כולם" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
      <Box
        sx={{
          margin: "5%",
          border: "none",
          backgroundColor: "white",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
          direction: "rtl",
        }}
      >
        <DataTable rows={rows} columns={columns} sx={{ border: "none" }} />
      </Box>
    </Box>
  );
};

export default Charts;
