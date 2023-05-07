import { React, useEffect, useState, setState } from "react";
import { useNavigate, useParams, useLocation, json } from "react-router-dom";
import axios from "axios";
import "./SelectSoldiers.css";
import NavBar from "../components/NavBar";

//mui import
import { ListItemButton, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { CircularProgress } from "@mui/material";

const SelectSoldiers = ({
  user,
  setUser,
  setChosenSoldiers,
  chosenSoldiers,
  role,
  setCollapse, //Collapse in SolPopUp
}) => {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [soldiers, setSoldiers] = useState(
    JSON.parse(window.sessionStorage.getItem("appData"))["soldiers"]
  );
  const [solName, setSolName] = useState("");
  const [soldier, setSoldier] = useState(0);
  const location = useLocation();
  const pageName = "חיפוש מתאמן";
  const navigate = useNavigate();
  const params = useParams();
  const [teamTest, setTeamTest] = useState(false);
  const [addEditPage, setAddEditPage] = useState(false);
  chosenSoldiers = chosenSoldiers || location.state.chosenSoldiers;

  // let filterCompanies = () => {
  //   console.log(soldiers);
  //   var temp_companies = [];
  //   for (const [key, value] of Object.entries(soldiers)) {
  //     temp_companies[value[1].company] = value[1].company;
  //   }
  //   console.log(temp_companies);
  //   setCompanyOptions(temp_companies);
  // };

  useEffect(() => {
    // const list_data = Object.keys(json_data).map((key) => json_data[key]);
    // console.log("json_data: ", json_data);
    // console.log("list_data:", list_data);

    console.log("soldiers", role);
    if (window.location.pathname.includes("Questionary")) setTeamTest(true);
    if (window.location.pathname.includes("AddEditSoldiers"))
      setAddEditPage(true);

    if (soldier !== 0) {
      if (teamTest) {
        setChosenSoldiers({ ...chosenSoldiers, [role]: soldier });
      } else if (addEditPage) {
        navigate(`/AddEditSoldiers/AddEditPage`, {
          state: {
            soldier: soldier,
          },
        });
      } else if (Object.keys(params).length > 0) {
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
  }, [soldier]);

  const handleChoice = (soldier_pressed) => {
    if (setCollapse != undefined) {
      setCollapse(false);
    } //value to collapse is SolPopUp comp
    for (var sol in soldiers) {
      if (soldiers[sol].id === soldier_pressed.id) {
        setSoldier(soldiers[sol]);
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
      {!teamTest && !addEditPage ? (
        <NavBar setUser={setUser} user={user} pageName={pageName} />
      ) : null}
      <div>
        {params.rid === undefined && !addEditPage ? (
          <Box
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Fab
              variant="extended"
              onClick={(e) => handleGeneralInput(e)}
              sx={{
                position: "fixed",
                margin: "0px",
                top: "auto",
                right: "auto",
                bottom: "55px",
                left: "20px",
                background:
                  "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
                borderColor: "#2ED573",
                boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
              }}
              aria-label="edit"
            >
              <Typography fontFamily={"Regular"}>
                 הזנה כללית ע״פ תפקיד
              </Typography>
            </Fab>
          </Box>
        ) : (
          ""
        )}
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ flexDirection: "column", marginX: "10%" }}
      >
        <TextField
          size="small"
          sx={{
            fontFamily: "Light",
            width: "100%",
            marginX: "10%",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
          dir="rtl"
          label=""
          value={solName}
          onChange={(e) => setSolName(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loaded ? (
        <Box>
          {/* <List>
            {soldiers.map((comp) => {
              return <ListItemButton>{comp[1].company}</ListItemButton>;
            })}
          </List> */}
          <List
            sx={{ width: "100%", paddingX: "10%", paddingBottom: "80px" }}
            dir="rtl"
          >
            {soldiers
              .filter((value) => value.role === location.state.role)
              .filter((sol) => {
                //fiter acording to the name of soldier
                return solName === ""
                  ? sol
                  : sol.first_name.includes(solName) ||
                      sol.last_name.includes(solName) ||
                      sol.serial_id.toString().includes(solName);
              })
              .filter((sol) => {
                //filter for the team test after choosing soldiers
                if (teamTest) {
                  var chosen = false;
                  for (const [key, value] of Object.entries(chosenSoldiers)) {
                    if (value.id === sol.id) {
                      chosen = true;
                    }
                  }
                  return !chosen;
                } else return true;
              })

              .map((sol) => {
                return (
                  <ListItemButton
                    sx={{
                      backgroundColor: "white",
                      marginY: "5%",
                      radius: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      display: "flex",
                      border: "none",
                      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                    }}
                    key={sol.id}
                    onClick={() => handleChoice(sol)}
                  >
                    <Box>
                      <Typography
                        fontFamily={"Bold"}
                        sx={{
                          alignSelf: "end",
                          width: "100%",
                          fontSize: "20px",
                          display: "inline-block",
                        }}
                      >
                        {sol.first_name + " " + sol.last_name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        fontFamily={"Bold"}
                        sx={{
                          alignSelf: "end",
                          width: "100%",
                          fontSize: "20px",
                          display: "inline-block",
                        }}
                      >
                        {/* {sol[1].company} plooga name */}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        fontFamily={"Bold"}
                        sx={{ width: "100%", fontSize: "20px" }}
                      >
                        {sol.soldier_serial_id}
                      </Typography>
                    </Box>
                  </ListItemButton>
                );
              })}
          </List>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "10%" }}>
          <CircularProgress color="success" />
        </Box>
      )}
    </div>
  );
};

export default SelectSoldiers;
