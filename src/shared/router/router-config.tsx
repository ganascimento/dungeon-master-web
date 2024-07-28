import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTER_PATHS } from "./router.path";
import HomePage from "../../pages/home";
import AdventurePage from "../../pages/adventure";
import CharPage from "../../pages/char";
import CharProfilePage from "../../pages/charProfile";
import GamePage from "../../pages/game";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.Home} element={<HomePage />}></Route>
        <Route
          path={ROUTER_PATHS.Adventure}
          element={<AdventurePage />}
        ></Route>
        <Route path={ROUTER_PATHS.Char} element={<CharPage />}></Route>
        <Route
          path={ROUTER_PATHS.CharProfile}
          element={<CharProfilePage />}
        ></Route>
        <Route path={ROUTER_PATHS.Game} element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
