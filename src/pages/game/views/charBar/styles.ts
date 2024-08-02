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
    conic-gradient(#dc3545 ${(props) => props.lifePerc}%, #181619 0);

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
  }
`;

export const ActionBar = styled.div`
  margin-left: 5px;
  width: 92px;
  height: 50%;
  max-height: 400px;
  border-radius: 0 7px 7px 0;
  border: 2px ridge #b78846;
  background: rgb(24, 22, 25, 0.8);
  display: flex;
  padding: 3px;
  gap: 4px;
  flex-flow: wrap;
  align-content: flex-start;
`;

export const EndTurnBtn = styled.div`
  height: 95px;
  width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom left, #181619, #4682b4);
  border-radius: 100px;
  border: 5px ridge #b78846;
  font-family: Roboto;
  font-size: 15px;
  opacity: 0.8;
  transition: 0.15s;

  &:hover {
    cursor: pointer;
    background: linear-gradient(to bottom left, #181619, #4682b4);
    opacity: 1;
    transition: 0.15s;
  }
`;
