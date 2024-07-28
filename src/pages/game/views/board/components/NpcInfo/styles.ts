import styled from "styled-components";

type PeronInfoProps = {
  positionX: number;
  positionY: number;
  selected: boolean;
};
export const PeronInfo = styled.div<PeronInfoProps>`
  position: absolute;
  top: ${(props) => props.positionY + "px"};
  left: ${(props) => props.positionX + "px"};
  width: 250px;
  background-color: black;
  border: 3px ridge #b78846;
  border-radius: 10px 10px 0 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  background: #e2dfd4;
  padding-top: 5px;

  &:hover {
    transition: 0.3s;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .item {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: black;
    font-size: 12px;
    text-align: start;
    margin-left: 7px;

    span {
      font-weight: bold;
    }
  }

  hr {
    margin: 5px 10px;
    padding: 0;
  }

  .contentBtn {
    display: flex;
    align-items: center;
    justify-content: space-around;

    div {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:nth-child(1) {
        color: #4f3933;
        filter: ${(props) =>
          props.selected ? "drop-shadow(3px 3px 2px #b78846)" : "none"};
      }

      &:nth-child(2) {
        color: #dc3545;
      }

      &:hover {
        filter: drop-shadow(2px 2px 2px #b78846);
      }
    }
  }
`;
