import React from "react";
import { ReactNode } from "react";
import * as S from "./styles";

type Props = {
  children: ReactNode;
  flexDirection?: "row" | "column";
  alignItems?: "center" | "start" | "end";
  justifyContent?:
    | "space-between"
    | "flex-start"
    | "center"
    | "end"
    | "space-around";
  margin?: string;
  gap?: string;
  width?: string;
  flexWrap?: "nowrap" | "wrap";
  maxWidth?: string;
  height?: string;
};

const Wrapper = (props: Props) => {
  return (
    <S.Wrapper
      $alignItems={props.alignItems}
      $justifyContent={props.justifyContent}
      margin={props.margin}
      gap={props.gap}
      $flexDirection={props.flexDirection}
      width={props.width}
      flexWrap={props.flexWrap}
      maxWidth={props.maxWidth}
      height={props.height}
    >
      {props.children}
    </S.Wrapper>
  );
};

export default Wrapper;

export const wrapperProperties = {
  children: "ReactNode",
  $flexDirection: "row,column",
  $alignItems: "center,start,end",
  $justifyContent: "space-between,start,center,end",
  margin: "string",
  gap: "string",
  width: "string",
};
