import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTER_PATHS } from "./router.path";
import CharPage from "../../pages/char";
import CharProfilePage from "../../pages/charProfile";
import GamePage from "../../pages/game";
import LoginPage from "../../pages/login";
import HomePage from "../../pages/home";
import { ProtectedRoute } from "./protected-route";
import CharUpLevelPage from "../../pages/charUpLevel";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_PATHS.Login} element={<LoginPage />}></Route>
        <Route
          path={ROUTER_PATHS.Home}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTER_PATHS.Char}
          element={
            <ProtectedRoute>
              <CharPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTER_PATHS.CharProfile}
          element={
            <ProtectedRoute>
              <CharProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTER_PATHS.Game}
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path={ROUTER_PATHS.CharUpLevel}
          element={
            <ProtectedRoute>
              <CharUpLevelPage />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
