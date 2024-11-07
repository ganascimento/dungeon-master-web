import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CreateBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
  text-shadow: 3px 3px 3px black;
  transition: 0.3s;

  &:hover {
    text-shadow: 1.5px 1.5px 1.5px black;
    transition: 0.3s;
  }

  &:active {
    text-shadow: none;
    transition: 0.3s;
  }
`;

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
