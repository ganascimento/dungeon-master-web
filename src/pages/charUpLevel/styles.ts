import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
`;

export const ContentPrincipal = styled.div`
  min-width: 150px;
  width: calc(15% + 30px);
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  background: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0.5));

  .margin {
    margin-top: 7vh;
  }

  .content {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 16px;
    margin-bottom: 15px;
    padding-left: 10px;
    cursor: pointer;
    text-shadow: #b78846 1px 1px 2px;

    .indicator {
      width: 45px;
      height: 45px;
      border-radius: 25px;
      border: 3px ridge #b78846;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      transition: 0.2s;

      &:hover {
        font-size: 35px;
        transition: 0.2s;
      }
    }

    .indicator-success {
      width: 45px;
      height: 45px;
      border-radius: 25px;
      border: 3px ridge green;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
      transition: 0.2s;

      &:hover {
        font-size: 35px;
        transition: 0.2s;
      }
    }
  }

  .selected {
    color: #b78846 !important;
  }
`;

export const ContentSecond = styled.div`
  min-width: 350px;
  width: 35%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  height: auto;
  max-height: calc(100% - 10px);
  border: 2px outset #b78846;
  border-radius: 15px;
  margin-top: 5vh;
  margin-left: -30px;
  background: linear-gradient(to bottom, #000, #000, rgba(0, 0, 0, 0.5));

  .content-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: -25px;
  }

  .header-icon {
    height: 100px;
    width: 90px;
    border-radius: 80px;
    border-top: 5px ridge #b78846;
    background-color: black;
    font-size: 40px;
    color: #ccc;

    svg {
      padding-top: 10px;
    }
  }
`;

export const ContentImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
`;
