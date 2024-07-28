import styled from "styled-components";

export const Content = styled.div`
  padding: 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
`;
export const Input = styled.input`
  color: white;
  border: none;
  outline: none;
  background: transparent;
  border: 2px ridge #b78846;
  font-size: 14px;
  width: 70%;
  text-indent: 10px;
  height: 35px;
`;

export const TextArea = styled.textarea`
  color: white;
  border: none;
  outline: none;
  background: transparent;
  border: 2px ridge #b78846;
  font-size: 14px;
  width: 70%;
  text-indent: 10px;
  resize: none;
`;
