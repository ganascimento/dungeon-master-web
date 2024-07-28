import styled from "styled-components";

export const Content = styled.div`
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  background-color: #935b4c;
  border-radius: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-bottom: 3px solid #111;
  outline: none;
  text-indent: 15px;
  transition: 0.2s;
  color: #fff;
  resize: none;
  padding-top: 10px;

  &:focus {
    border-bottom: 6px solid #111;
    transition: 0.2s;
  }

  &::placeholder {
    color: #ddd;
  }
`;

type CounterProps = {
  status?: "default" | "error" | "success";
};
const getColorFromState = (props: CounterProps) => {
  switch (props.status) {
    case "error":
      return "#dc3545";
    case "success":
      return "#28a745";
    default:
      return "#fff";
  }
};
export const Counter = styled.div<CounterProps>`
  width: 100%;
  font-size: 15px;
  display: flex;
  align-items: start;
  justify-content: end;
  color: ${(props) => getColorFromState(props)};
`;
