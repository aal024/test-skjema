import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import MainP from "./pages/MainP";
import { GlobalContext } from "./helper/Context";

function App() {
  const [globalState, setGlobalState] = useState(GlobalContext);

  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<MainP />} />
          <Route exact path="/edit" element={<Edit />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;