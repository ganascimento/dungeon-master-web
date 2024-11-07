import styled from "styled-components";

export const BonusContent = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  gap: 15px;
  flex-wrap: wrap;
`;

type BonusProps = {
  color: string;
  isUp: boolean;
};
export const Bonus = styled.div<BonusProps>`
  display: flex;
  align-items: end;

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 50px;
    border: 1px solid #b78846;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.color};
    background-color: rgba(255, 255, 255, 0.1);
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 38px;

    .value {
      font-size: 13px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      color: ${(props) => (props.isUp ? "green" : "red")};
      margin: 0 0 1px 3px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }

    .iconTurn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -3px 0 0 0;

      svg {
        font-size: 22px;
        color: #b78846;
      }

      .turnValue {
        font-size: 12px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: #fff;
      }
    }
  }
`;
