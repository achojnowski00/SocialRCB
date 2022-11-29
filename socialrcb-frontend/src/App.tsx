import React from "react";
import { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Profile } from "./Pages/Profile/Profile";

function App() {
  const [kategoria, setKategoria] = useState<number[]>([1, 2, 3, 4, 5]);
  const [region, setRegion] = useState<any[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);

  return (
    <div className="App">
      <div className="wrapper">
        <BrowserRouter>
          <Header
            kategoria={kategoria}
            setKategoria={setKategoria}
            region={region}
            setRegion={setRegion}
          />
          {/* {window.localStorage.access && (
            <button className="logoutButton" onClick={logout}>
              Wyloguj
            </button>
          )} */}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  kategoria={kategoria}
                  setKategoria={setKategoria}
                  region={region}
                  setRegion={setRegion}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
