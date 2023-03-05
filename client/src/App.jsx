import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Questionary from "./pages/Questionary";
import TestType from "./pages/TestType";
import SelectSoldiers from "./pages/SelectSoldiers";
import ChooseRole from "./pages/ChooseRole";
import GeneralInput from "./pages/GeneralInput";

import Image from "./image/background.png"; // Import using relative path
//import mui
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const themeLight = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(245,255,255)",
          backgroundImage: `linear-gradient(71deg, rgba(245,255,255,1) 47%, rgba(173,225,229,1) 100%)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
        },
      },
    },
  },
});

const themeDark = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "rgb(0,0,0)",
            backgroundImage: `linear-gradient(71deg, rgba(0,0,0,1) 5%, rgba(33,48,125,1) 100%);`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100%",
          },
        },
      },
    },
    palette: {
      text: {
        primary: "#ffffff",
      },
    },
  }

  //   palette: {
  //     background: {
  //       default: "#222222",
  //     },
  //     text: {
  //       primary: "#ffffff",
  //     },
  //   },
  // }
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [light, setLight] = useState(true);

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>

      <div className="App">
        <BrowserRouter>
          {/* <img
          className="demo-bg"
          src=" http://1.bp.blogspot.com/-BInHLTLYcSY/U9CdS4qEBoI/AAAAAAAAAac/Rt3ynw8GBy4/s1600/4.jpg"
          alt=""
        /> */}
          <Routes>
            {isAuthenticated ? (
              <Route
                path="/"
                element={<Home setIsAuthenticated={setIsAuthenticated} />}
              />
            ) : (
              <Route
                path="/"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
            )}
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
            <Route path="/MyTrainees/ChooseRole" element={<ChooseRole />} />
            <Route path="/GeneralInput/ChooseRole" element={<ChooseRole />} />
            <Route
              path="/GeneralInput/ChooseRole/:rid/TestType"
              element={<TestType />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
