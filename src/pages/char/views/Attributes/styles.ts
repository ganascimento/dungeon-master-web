import styled from "styled-components";

export const Ability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;

  .content-name {
    margin-left: 25px;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 25px;

    span {
      display: block;
      font-size: 16px;
      width: 40%;
      min-width: 140px;
      max-width: 180px;
      text-align: left;
    }

    svg {
      color: #b78846;
    }
  }

  .content-btn {
    margin-right: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    gap: 12px;

    .btn {
      border: 2px ridge #b78846;
      height: 28px;
      width: 28px;
      border-radius: 25px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        color: white !important;
      }
    }

    .bonus {
      font-size: 15px;
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

export const Text = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Margin = styled.div`
  margin-bottom: 5vh;
`;
