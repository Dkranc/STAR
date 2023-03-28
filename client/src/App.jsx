import { React, useState, useEffect } from "react";
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
  //test - check isAuthenticated change value

  const [light, setLight] = useState(true);

  const changeState = () => {
    setLight((prev) => !prev);
  };

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      {/* <ToggleThemeButton changeState={changeState} lightState={light}/> */}
      <div className="App">
        <BrowserRouter>
          {user === null ? (
            <Routes>
              <Route
                path="/"
                element={<Login setUser={setUser} lightState={light} />}
              />

              <Route
                path="/SelectSoldiers/:rid/TestType/Questionary/:ttid"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType/Questionary/:ttid"
                element={<Login setUser={setUser} lightState={light} />}
              />

              <Route
                path="/SelectSoldiers/:rid/TestType"
                element={<Login setUser={setUser} lightState={light} />}
              />

              <Route
                path="/SelectSoldiers/:rid"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/MyTrainees"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/MyTrainees/ChooseRole"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/TestType/:ttid/Questionary/:qid"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/Charts"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/AddEditSoldiers"
                element={<Login setUser={setUser} lightState={light} />}
              />
              <Route
                path="/AddEditSoldiers/AddEditPage"
                element={<Login setUser={setUser} lightState={light} />}
              />
            </Routes>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Home setUser={setUser} user={user} lightState={light} />
                }
              />
              <Route
                path="/SelectSoldiers/:rid/TestType/Questionary/:ttid"
                element={<Questionary />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType/Questionary/:ttid"
                element={<Questionary />}
              />

              <Route
                path="/SelectSoldiers/:rid/TestType"
                element={<TestType />}
              />

              <Route path="/SelectSoldiers/:rid" element={<SelectSoldiers />} />
              <Route path="/MyTrainees" element={<SelectSoldiers />} />
              <Route
                path="/MyTrainees/ChooseRole"
                element={<ChooseRole user={user} />}
              />
              <Route
                path="/GeneralInput/ChooseRole"
                element={<ChooseRole user={user} />}
              />
              <Route
                path="/GeneralInput/ChooseRole/:rid/TestType"
                element={<TestType />}
              />
              <Route
                path="/Charts/ChooseRole"
                element={<ChooseRole user={user} />}
              />
              <Route path="/Charts/:rid/Graphs" element={<Charts />} />
              <Route path="/AddEditSoldiers" element={<AddEditSoldiers />} />
              <Route
                path="/AddEditSoldiers/AddEditPage"
                element={<AddEditPage />}
              />
            </Routes>
          )}
        </BrowserRouter>
        {user !== null ? (
          <Box display="center" justifyContent="center" alignItems="center">
            <Box
              component="img"
              sx={{
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
      </div>
    </ThemeProvider>
  );
}

export default App;
