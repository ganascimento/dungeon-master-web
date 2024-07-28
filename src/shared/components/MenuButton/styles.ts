import styled from "styled-components";

type ContentProps = {
  disabled?: boolean;
  width?: number;
  marginBottom?: string;
};

export const Content = styled.div<ContentProps>`
  width: ${(props) => (props.width ? `${props.width}px` : "240px")};
  height: 50px;
  background-color: #935b4c;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid #302320;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-bottom: ${(props) => props.marginBottom ?? "22px"};
`;

export const SubContent = styled.div<ContentProps>`
  width: ${(props) => (props.width ? `${props.width - 10}px` : "240px")};
  height: 50px;
  border-radius: 10px;
  position: absolute;
  margin-top: -15px;
  border-bottom: 5px solid #30231e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #30231e;
  font-size: 20px;
  background: ${(props) => (props.disabled ? "#ccc" : "#e5bfa1")};

  &:hover {
    border-bottom: ${(props) => (props.disabled ? "" : "3px solid black")};
  }

  &:active {
    border-bottom: ${(props) => (props.disabled ? "" : "1px solid black")};
  }
`;
