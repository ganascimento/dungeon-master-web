import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  width: auto;
  max-width: 290px;
  height: 100%;
  gap: 7px;
  margin: 0 3px;
`;

type AvatarProps = {
  $lifePerc: number;
  $staminaPerc: number;
  $expPerc?: number;
};
export const Avatar = styled.div<AvatarProps>`
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  height: 122px;
  width: 122px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(#556b2f ${(props) => props.$expPerc ?? 0}%, transparent 0%);
  position: relative;

  .content {
    height: 110px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px ridge #b78846;
    background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
      conic-gradient(
        #181619 ${(props) => props.$staminaPerc}%,
        #007bff 0,
        #007bff 50%,

        #dc3545 50%,
        #dc3545 calc(${(props) => props.$lifePerc}% + 50%),
        #181619 0%
      );
  }

  .sub {
    height: 97px;
    width: 97px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    border-radius: 100px;
    border: 1px ridge #b78846;
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

  .popup {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 250px;
    background: linear-gradient(to bottom, #181619, #30231e);
    border-radius: 10% / 8%;
    border: 2px ridge #b78846;
    padding: 8px 10px;
    z-index: 1;
    top: 15%;
    left: 105%;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    color: #fff;
    box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }

  &:hover {
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    transition: 0.3s;

    .popup {
      visibility: visible;
      opacity: 1;
      transition: 0.3s;
    }
  }

  &:active {
    box-shadow: none;
    transition: 0.3s;
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
  disabled?: boolean;
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

type StartBtnProps = {
  disabled: boolean;
};
export const StartBtn = styled.div<StartBtnProps>`
  height: 95px;
  width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.disabled
      ? "#aaa"
      : "linear-gradient(to bottom left, #008b8b, #40e0d0)"};
  border-radius: 100px;
  border: 5px ridge #b78846;
  font-family: Roboto;
  font-size: 15px;
  opacity: 0.6;
  transition: 0.15s;

  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background: ${(props) =>
      props.disabled
        ? "#aaa"
        : "linear-gradient(to bottom left, #008b8b, #40e0d0)"};
    opacity: ${(props) => (props.disabled ? "0.6" : "1")};
    transition: 0.15s;
  }
`;

export const ContentIcon = styled.div`
  display: flex;
  flex-direction: column;

  .char-name {
    font-size: 11px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;

export const ExitBtn = styled.div`
  height: 95px;
  width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom left, #fdda0d, #ffc000);
  border-radius: 100px;
  border: 5px ridge #b78846;
  font-family: Roboto;
  font-size: 15px;
  opacity: 0.6;
  transition: 0.15s;

  &:hover {
    cursor: pointer;
    background: linear-gradient(to bottom left, #fdda0d, #ffc000);
    opacity: 1;
    transition: 0.15s;
  }
`;

export const MinAvatar = styled.div<AvatarProps>`
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px ridge #b78846;
  background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(
      #181619 ${(props) => props.$staminaPerc}%,
      #007bff 0,
      #007bff 50%,

      #dc3545 50%,
      #dc3545 calc(${(props) => props.$lifePerc}% + 50%),
      #181619 0%
    );
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  .sub {
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    border-radius: 100px;
    border: 2px ridge #b78846;
    background: #181619;
  }

  .popup {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 250px;
    background: linear-gradient(to bottom, #181619, #30231e);
    border-radius: 10% / 8%;
    border: 2px ridge #b78846;
    padding: 8px 10px;
    z-index: 1;
    top: -25%;
    left: 115%;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    color: #fff;
    box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }

  &:hover {
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    transition: 0.3s;

    .popup {
      visibility: visible;
      opacity: 1;
      transition: 0.3s;
    }
  }

  &:active {
    box-shadow: none;
    transition: 0.3s;
  }

  svg {
    font-size: 30px;
  }
`;
