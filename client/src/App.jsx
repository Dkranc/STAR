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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <img
          className="demo-bg"
          src=" http://1.bp.blogspot.com/-BInHLTLYcSY/U9CdS4qEBoI/AAAAAAAAAac/Rt3ynw8GBy4/s1600/4.jpg"
          alt=""
        />
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

          <Route path="/SelectSoldiers/:rid/TestType" element={<TestType />} />

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
  );
}

export default App;
