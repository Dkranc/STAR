import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Questionary from "./pages/Questionary";
import TestType from "./pages/TestType";
import SelectSoldiers from "./pages/SelectSoldiers";
import ChooseRole from "./pages/ChooseRole";
import jwtDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState(
    sessionStorage.getItem("token") !== null
      ? jwtDecode(jwtDecode(sessionStorage.getItem("token")).secret)
      : null
  );

  return (
    <div className="App">
      <BrowserRouter>
        <img
          className="demo-bg"
          src=" http://1.bp.blogspot.com/-BInHLTLYcSY/U9CdS4qEBoI/AAAAAAAAAac/Rt3ynw8GBy4/s1600/4.jpg"
          alt=""
        />
        <Routes>
          {user !== null ? (
            <Route path="/" element={<Home setUser={setUser} user={user} />} />
          ) : (
            <Route path="/" element={<Login setUser={setUser} />} />
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
