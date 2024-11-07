import styled from "styled-components";

export const Content = styled.div`
  padding: 0 25px 25px 25px;
  display: flex;
  gap: 20px;
`;

type ItemPros = {
  selected: boolean;
};
export const Item = styled.div<ItemPros>`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 16px;
    text-shadow: ${(props) => (props.selected ? "3px 3px 2px #b78846" : "")};
  }

  svg {
    font-size: 50px;
    filter: ${(props) =>
      props.selected ? "drop-shadow(3px 3px 2px #b78846)" : ""};
  }

  .popup {
    visibility: hidden;
    width: 250px;
    background: linear-gradient(to bottom, #181619, #30231e);
    border-radius: 10% / 8%;
    border: 2px ridge #b78846;
    padding: 8px 10px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
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
    }
  }

  &:hover {
    filter: drop-shadow(1px 1px 2px #b78846);
    text-shadow: 1px 1px 2px #b78846;

    .popup {
      visibility: visible;
    }
  }
`;

export const Title = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
`;

export const Ability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .content-name {
    margin-left: 25px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 25px;

    span {
      display: block;
      font-size: 13px;
      width: 40%;
      min-width: 140px;
      max-width: 180px;
      text-align: left;
    }

    svg {
      font-size: 25px;
      color: #b78846;
    }
  }

  .value {
    font-size: 14px;
  }
`;
