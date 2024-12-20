import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: start;
`;

export const SubTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  margin-top: 25px;
  font-size: 22px;
`;

export const PersonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const PersonView = styled.div`
  border: 1px solid #b78846;
  width: 80px;
  height: 95px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  box-shadow: 2px 2px 2px #935b4c;
  transition: 0.3s;
  flex-direction: column;
  gap: 5px;

  &:hover {
    box-shadow: none;
    transition: 0.3s;
  }

  &:active {
    box-shadow: 1px 1px 1px #935b4c;
    transition: 0.3s;
  }

  div {
    font-size: 13px;
  }
`;

type PersonSelectProps = {
  $active: boolean;
  $isMyChar: boolean;
};
export const PersonSelect = styled.div<PersonSelectProps>`
  border: 1px solid ${(props) => (props.$active ? "#28a745" : "#b78846")};
  width: 80px;
  height: 95px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  box-shadow: ${(props) => (props.$active ? "none" : "2px 2px 2px #935b4c")};
  transition: 0.3s;
  flex-direction: column;
  gap: 5px;
  cursor: ${(props) => (props.$isMyChar ? "pointer" : "not-allowed")};

  &:hover {
    box-shadow: none;
    transition: 0.3s;
  }

  &:active {
    box-shadow: 1px 1px 1px #935b4c;
    transition: 0.3s;
  }

  div {
    font-size: 13px;
  }
`;

export const TextReady = styled.div`
  color: #28a745;
`;
