import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTabs = styled.div`
  display: flex;
  gap: 7px;
`;

type TabProps = {
  active: boolean;
};
export const Tab = styled.div<TabProps>`
  width: auto;
  padding: 7px 35px;
  font-size: 25px;
  border-radius: 10px 10px 0 0;
  box-shadow: ${(props) => (props.active ? "none" : "2px 2px 2px #935b4c")};
  background-color: #e5bfa1;
  color: black;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 2px 2px 2px #b3544c;
    transition: 0.3s;
  }
  &:active {
    box-shadow: none;
    transition: 0.1s;
  }
`;

export const Body = styled.div`
  background: #302220;
  padding: 20px;
  margin-top: 5px;
  border-radius: 0 0 10px 10px;
  box-shadow: 1px 1px 3px #e5bfa1;
`;
