import styled from "styled-components";

export const Content = styled.div`
  width: 30%;
  height: 100%;
  max-width: 450px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const SpaceContent = styled.div`
  padding: 8px;
  height: calc(100% - 150px);
  overflow-y: auto;
`;

type TileProps = {
  iconColor: string;
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
      color: ${(props) => props.iconColor};
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

export const ContentChat = styled.div`
  padding: 0 20px;
  margin-top: 12px;
`;

export const ContentTo = styled.div`
  text-align: start;
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  .to {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 13px;
    font-weight: bold;
    margin-left: 10px;
    text-decoration: none;
    background: #e2dfd4;
    color: #555;
    padding: 5px 7px;
    border-radius: 3px;
    border: 2px ridge #b78846;
    display: flex;
    align-items: center;
    gap: 10px;

    .btn {
      color: #fff;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      background: #dc3545;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: red;
      }
    }
  }
`;

type ContentInputProps = {
  enable: boolean;
};
export const ContentInput = styled.div<ContentInputProps>`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  textarea {
    width: calc(100% - 14px - 55px);
    outline: none;
    border: 1px ridge #b78846;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 10px 7px;
    font-size: 13px;
    resize: none;
    transition: 0.1s;
  }

  textarea:focus {
    border: 3px ridge #b78846;
    transition: 0.1s;
  }

  div {
    margin-top: 7px;
    width: 35px;
    height: 35px;
    font-size: 20px;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 3px ridge ${(props) => (props.enable ? "#b78846" : "#aaa")};
    cursor: ${(props) => (props.enable ? "pointer" : "")};

    &:hover {
      color: ${(props) => (props.enable ? "#fff" : "")};
    }
  }
`;
