import styled from "styled-components";

type Props = {
  background: any;
  useImage: boolean;
};
export const Content = styled.div<Props>`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: ${(props) => (props.useImage ? props.background : "none")};
  background-position: ${(props) => (props.useImage ? "center" : "none")};
  background-size: ${(props) => (props.useImage ? "contain" : "none")};
  background-size: ${(props) => (props.useImage ? "100% 100%" : "none")};
`;

export const SubContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1500px;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
`;
