import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  text-align: start;
  flex-direction: column;

  .title {
    font-size: 20px;
  }

  ul {
    margin: 5px 0 30px 0;
  }

  li {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 13px;
    margin: 3px 0;
  }

  svg {
    font-size: 20px !important;
    color: #87cefa;
  }
`;
