import { React, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Questionary from "./pages/Questionary";
import TestType from "./pages/TestType";
import SelectSoldiers from "./pages/SelectSoldiers";
import ChooseRole from "./pages/ChooseRole";
import AddEditSoldiers from "./pages/AddEditSoldiers";
import AddEditPage from "./pages/AddEditPage";
import CompanyChoice from "./pages/CompanyChoice";
import TestInputGeneral from "./pages/TestInputGeneral";

import ChooseTraining from "./pages/ChooseTraining";

import jwtDecode from "jwt-decode";
import ToggleThemeButton from "./components/ToggleThemeButton";
import Image from "./image/background.png"; // Import using relative path
import Charts from "./pages/Charts";
//import mui
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
//import images
import lightModeLogo from "./image/logoLightMode.png";

//theme
import { themeLight, themeDark } from "./theme.js";


function App() {
  const [user, setUser] = useState(
    sessionStorage.getItem("token") !== null
      ? jwtDecode(jwtDecode(sessionStorage.getItem("token")).secret)
      : null
  );

  // useEffect(() => {
  //   user=user||location.state.user;
  // }, []);

  const [light, setLight] = useState(true);

  const changeState = () => {
    setLight((prev) => !prev);
  };

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      {/* <ToggleThemeButton changeState={changeState} lightMode={light} /> */}
      <Box paddingBottom={"70px"} className="App">
        <BrowserRouter>
          <Toaster />
          {user === null ? (
            <Routes>
              <Route
                path="/"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/Home"
                element={
                  <Login setUser={setUser} user={user} lightMode={light} />
                }
              />
              <Route
                path="/SelectSoldiers/:rid/TestType/Questionary/:ttid"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType/Questionary/:ttid"
                element={<Login setUser={setUser} lightMode={light} />}
              />

              <Route
                path="/SelectSoldiers/:rid/TestType"
                element={<Login setUser={setUser} lightMode={light} />}
              />

              <Route
                path="/SelectSoldiers/:rid"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/MyTrainees"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/MyTrainees/ChooseRole"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/TestType/:ttid/Questionary/:qid"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/Charts"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/AddEditSoldiers"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/AddEditSoldiers/AddEditPage"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
                path="/CompanyChoice"
                element={<Login setUser={setUser} lightMode={light} />}
              />
              <Route
              path="/SpecificTestInput/:ttid"
              element={<Login setUser={setUser} lightMode={light} />}
            />
            </Routes>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <ChooseTraining
                    setUser={setUser}
                    user={user}
                    lightMode={light}
                  />
                }
              />
              <Route
                path="/Home"
                element={
                  <Home setUser={setUser} user={user} lightMode={light} />
                }
              />
              <Route
                path="/SelectSoldiers/:rid/TestType/Questionary/:ttid"
                element={<Questionary user={user} setUser={setUser} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType/Questionary/:ttid"
                element={<Questionary user={user} setUser={setUser} />}
              />

              <Route
                path="/SelectSoldiers/:rid/TestType"
                element={<TestType user={user} setUser={setUser} />}
              />

              <Route
                path="/SelectSoldiers/:rid"
                element={<SelectSoldiers setUser={setUser} user={user} />}
              />
              <Route
                path="/MyTrainees"
                element={<SelectSoldiers user={user} setUser={setUser} />}
              />
              <Route
                path="/MyTrainees/ChooseRole"
                element={<ChooseRole user={user} setUser={setUser} />}
              />
              <Route
                path="/GeneralInput/ChooseRole"
                element={<ChooseRole user={user} setUser={setUser} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType"
                element={<TestType TestType user={user} setUser={setUser} />}
              />
              <Route
                path="/Charts/ChooseRole"
                element={<ChooseRole user={user} setUser={setUser} />}
              />
              <Route
                path="/Charts/:rid/Graphs"
                element={<Charts user={user} setUser={setUser} />}
              />
              <Route
                path="/AddEditSoldiers"
                element={<AddEditSoldiers user={user} setUser={setUser} />}
              />
              <Route
                path="/AddEditSoldiers/AddEditPage"
                element={<AddEditPage user={user} setUser={setUser} />}
              />
              <Route
                path="/CompanyChoice"
                element={<CompanyChoice user={user} setUser={setUser} />}
              />
              <Route
              path="/SpecificTestInput/:ttid"
              element={<TestInputGeneral user={user} setUser={setUser} />}
            />
            </Routes>
          )}
        </BrowserRouter>
        {user !== null ? (
          <Box
            sx={{
              backgroundColor: "#F3F3F3",
              position: "fixed",
              bottom: 0,
              width: "100%",
              overflow: "hidden",
            }}
            display="center"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              sx={{
                bottom: 0,
                height: 63,
                width: 84,
                maxWidth: { xs: 84, md: 84 },
                maxHeight: { xs: 63, md: 63 },
              }}
              alt="logo"
              src={lightModeLogo}
            />
          </Box>
        ) : (
          <Box />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
