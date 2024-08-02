import styled from "styled-components";

type ContentProps = {
  selected: boolean;
};
export const Content = styled.div<ContentProps>`
  border-radius: 3px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.selected
      ? `repeating-conic-gradient(
    from var(--a),
    #fff 0%,
    #fff 10%,
    transparent 5%,
    transparent 35%,
    #fff 50%
  )`
      : ""};
  animation: animate 2s linear infinite;

  @property --a {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  @keyframes animate {
    0% {
      --a: 0deg;
    }
    100% {
      --a: 360deg;
    }
  }
`;

type ItemProps = {
  color?: string;
  selected: boolean;
  iconPosition: "normal" | "left";
};
export const Item = styled.div<ItemProps>`
  cursor: pointer;
  border: 1px ridge #b78846;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;
  font-size: 30px;
  color: ${(props) => (props.selected ? props.color : "#bbb")};
  background: ${(props) =>
    props.selected
      ? "linear-gradient(to bottom, #343543, #682f2f)"
      : "linear-gradient(to bottom, #34354310, #682f2f10)"};

  .popup {
    visibility: hidden;
    width: 250px;
    background: linear-gradient(to bottom, #181619, #30231e);
    border-radius: 10% / 8%;
    border-top: 3px ridge #b78846;
    border-bottom: 2px ridge #b78846;
    padding: 8px 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: ${(props) => (props.iconPosition === "normal" ? "50%" : "100%")};
    margin-left: ${(props) =>
      props.iconPosition === "normal" ? "-80px" : "-40px"};
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
    color: #fff;

    div {
      font-family: Roboto;
    }
    .name {
      font-size: 17px;
      font-weight: 400;
    }
    .type {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 12px;
    }
    .damage {
      font-size: 21px;
      margin-bottom: 12px;
    }
    .dice {
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        font-size: 35px;
      }
      span {
        font-size: 16px;
      }
    }
  }

  &:hover {
    .popup {
      visibility: visible;
    }
  }
`;
