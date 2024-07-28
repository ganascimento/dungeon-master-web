import styled from "styled-components";

type Props = {
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  gap?: string;
  flexDirection?: string;
  width?: string;
  flexWrap?: string;
  maxWidth?: string;
  height?: string;
};

export const Wrapper = styled.div<Props>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  background: transparent;
  flex-wrap: ${(props) => props.flexWrap};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  height: ${(props) => props.height};
`;
