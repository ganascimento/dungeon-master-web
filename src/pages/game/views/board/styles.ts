import styled from "styled-components";
import tavern from "../../../../shared/assets/images/tavern.jpg";

type ContentProps = {
  width: number;
  height: number;
};
export const Content = styled.div<ContentProps>`
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
  background: #ccc;
  background-image: url(${tavern});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;
