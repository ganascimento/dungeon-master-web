import styled from "styled-components";

type LanguageProps = {
  selected: boolean;
};
export const Language = styled.div<LanguageProps>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  box-shadow: ${(props) => (props.selected ? "none" : "3px 3px 2px #333")};
  border: 1px solid ${(props) => (props.selected ? "#fff" : "#aaa")};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    box-shadow: 1px 1px 2px #333;
  }

  &:active {
    transition: 0.3s;
    box-shadow: none;
  }
`;
