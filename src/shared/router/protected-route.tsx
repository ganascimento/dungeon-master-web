import React from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../security/authentication";
import { ROUTER_PATHS } from "./router.path";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = (props: Props) => {
  if (isAuthenticated()) return props.children as any;

  return <Navigate to={ROUTER_PATHS.Login} />;
};
