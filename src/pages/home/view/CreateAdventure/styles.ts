import styled from "styled-components";

export const DificutyContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  margin-top: 25px;
  font-size: 22px;
`;

export const PersonAddContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

type PersonAddProps = {
  selected: boolean;
};
export const PersonAdd = styled.div<PersonAddProps>`
  border: 1px solid #b78846;
  width: 80px;
  height: 95px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  cursor: pointer;
  box-shadow: ${(props) => (props.selected ? "3px 3px 3px #935b4c" : "none")};
  transition: 0.3s;
  flex-direction: column;
  gap: 5px;

  &:hover {
    box-shadow: ${(props) =>
      props.selected ? "3px 3px 3px #935b4c" : "1px 1px 1px #935b4c"};
    transition: 0.3s;
  }

  div {
    font-size: 13px;
  }

  svg {
    color: ${(props) => (props.selected ? "white" : "none")};
  }
`;
