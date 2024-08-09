import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  bottom: 0px;
  width: auto;
  max-width: 290px;
  height: 100%;
  gap: 7px;
  margin: 0 10px;
`;

type AvatarProps = {
  lifePerc: number;
  staminaPerc: number;
};
export const Avatar = styled.div<AvatarProps>`
  height: 115px;
  width: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px ridge #b78846;
  background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(
      #181619 ${(props) => props.staminaPerc}%,
      #007bff 0,
      #007bff 50%,

      #dc3545 50%,
      #dc3545 calc(${(props) => props.lifePerc}% + 50%),
      #181619 0%
    );
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.4);

  .sub {
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    border-radius: 100px;
    border: 2px ridge #b78846;
    background: #181619;

    .attr {
      margin-top: 5px;
      font-family: Roboto;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      div {
        &:nth-child(1) {
          border-bottom: 1px solid white;
        }
      }
    }
  }
`;

export const ActionBar = styled.div`
  margin-left: 5px;
  width: 92px;
  height: 50%;
  max-height: 400px;
  border-radius: 5px;
  border: 2px ridge #b78846;
  background: rgb(24, 22, 25, 0.8);
  display: flex;
  padding: 3px;
  gap: 4px;
  flex-flow: wrap;
  align-content: flex-start;
`;

type EndTurnBtnProps = {
  disabled: boolean;
};
export const EndTurnBtn = styled.div<EndTurnBtnProps>`
  height: 95px;
  width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.disabled
      ? "#aaa"
      : "linear-gradient(to bottom left, #181619, #4682b4)"};
  border-radius: 100px;
  border: 5px ridge #b78846;
  font-family: Roboto;
  font-size: 15px;
  opacity: 0.7;
  transition: 0.15s;

  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background: ${(props) =>
      props.disabled
        ? "#aaa"
        : "linear-gradient(to bottom left, #181619, #4682b4)"};
    opacity: ${(props) => (props.disabled ? "0.8" : "1")};
    transition: 0.15s;
  }
`;

export const Itens = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  margin-left: 10px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
    border-radius: 4px;
    border: 2px ridge #b78846;
    background: rgb(24, 22, 25, 0.8);
    color: #ccc;
    cursor: pointer;
    position: relative;

    .popup {
      visibility: hidden;
      width: 250px;
      background: linear-gradient(to bottom, #181619, #30231e);
      border-radius: 10% / 8%;
      border: 2px ridge #b78846;
      padding: 8px 10px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 100%;
      margin-left: -40px;
      display: flex;
      align-items: start;
      justify-content: start;
      flex-direction: column;
      color: #fff;
      box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);

      div {
        font-family: Roboto;
        color: white;
        margin-bottom: 0;
      }
      .main {
        font-size: 15px;
        font-weight: 400;
        color: #b78846;
        margin-bottom: 3px;
        font-weight: 600;
      }
      .second {
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 3px;
        font-weight: 600;
      }
      .text {
        width: 100%;
        font-size: 12px;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: start;
        align-items: start;
        text-align: start;
        color: #ccc;
      }
    }

    &:hover {
      .popup {
        visibility: visible;
      }
    }
  }
`;
