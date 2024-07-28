import styled from "styled-components";

export const Flag = styled.div`
  width: 100%;
  height: 50px;
  background: #935b4c;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  margin-bottom: 15px;

  &:hover {
    box-shadow: rgba(183, 136, 70, 0.4) 0px 0px 0px 2px,
      rgba(183, 136, 70, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  &:active {
    box-shadow: none;
  }

  i {
    font-size: 35px;
    cursor: pointer;
    color: #b78846;
    margin-top: 12px;
  }
`;
