import styled from "styled-components";

export const Content = styled.div`
  width: 30%;
  height: 100%;
  max-width: 450px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const SpaceContent = styled.div`
  padding: 8px;
  height: calc(100% - 16px);
  overflow-y: auto;

  .content-load {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type TileProps = {
  $iconColor: string;
};
export const Tile = styled.div<TileProps>`
  background: #e2dfd4;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  color: black;
  text-align: left;
  padding: 5px;
  margin-bottom: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;
    border-bottom: 2px ridge rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;

    .ident {
      border: 3px ridge #aa5;
      height: 35px;
      width: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      margin-bottom: 5px;
      color: ${(props) => props.$iconColor};
      background: #18161990;
    }

    .name {
      font-family: Roboto;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    line-height: 17px;
  }
`;
