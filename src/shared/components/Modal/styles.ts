import styled from "styled-components";

export const Background = styled.div`
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #aaa;
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
  }
  z-index: 7777777;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: start;
  justify-content: start;
`;

export const ContentModal = styled.div`
  z-index: 7777778;
  max-width: 1200px;
  width: 90%;
  height: 85vh;
  background-color: #302320;
  overflow-y: auto;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: end;
`;

export const CloseBtn = styled.div`
  margin-right: 15px;
  background-color: #dc3545;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

  &:hover {
    font-size: 13px;
  }
`;

export const ModalBody = styled.div`
  height: calc(100% - 135px);
  margin-top: 35px;
  padding: 25px 25px 0px 25px;
`;
