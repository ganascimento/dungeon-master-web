import React from "react";
import { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  children: ReactNode;
  flexDirection?: "row" | "column";
  alignItems?: "center" | "start" | "end";
  justifyContent?: "space-between" | "flex-start" | "center" | "end";
  margin?: string;
  gap?: string;
  width?: string;
  flexWrap?: "nowrap" | "wrap";
  maxWidth?: string;
  height?: string;
};

const Wrapper = (props: Props) => {
  return <S.Wrapper {...props}>{props.children}</S.Wrapper>;
};

export default Wrapper;

export const wrapperProperties = {
  children: "ReactNode",
  flexDirection: "row,column",
  alignItems: "center,start,end",
  justifyContent: "space-between,start,center,end",
  margin: "string",
  gap: "string",
  width: "string",
};
