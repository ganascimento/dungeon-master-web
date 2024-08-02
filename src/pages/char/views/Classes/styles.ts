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

  &:hover {
    filter: drop-shadow(1px 1px 2px #b78846);
    text-shadow: 1px 1px 2px #b78846;
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
