import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Questionary from "./pages/Questionary";
import TestType from "./pages/TestType";

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
            <Route path="/" element={<Home  setIsAuthenticated={setIsAuthenticated} />} />
          ) : (
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
          )}
          <Route
          path="/TestType/:rid/Questionary/:ttid"
          element={<Questionary />}
        /> 
          <Route
          path="TestType/:rid/"
          element={<TestType />}
        /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
