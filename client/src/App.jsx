import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route
              path="/"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
