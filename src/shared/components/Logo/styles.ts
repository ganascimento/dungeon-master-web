import styled from "styled-components";

type Props = {
  fontSize: string;
};
export const Text = styled.h1<Props>`
  font-family: DragonHunter;
  font-size: ${(props) => props.fontSize};
  text-align: center;
  text-shadow: #222 4px 4px 3px;
`;
