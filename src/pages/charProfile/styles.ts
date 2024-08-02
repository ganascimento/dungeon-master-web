import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
`;

export const ContentProfile = styled.div`
  min-width: 400px;
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

export const Name = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const Race = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.5);
`;

export const ContentImage = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
`;

export const ContentSkills = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 30px;
  margin-bottom: 20px;
`;
