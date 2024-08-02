import styled from "styled-components";

type ContentProps = {
  width: number;
  height: number;
  imagePath: string;
};
export const Content = styled.div<ContentProps>`
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
  background: #ccc;
  background-image: url(${(props) => props.imagePath});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 7px;
  box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
`;
