import styled from "styled-components";

export const TextMain = styled.div`
  font-size: 25px;
`;

type TextSecondaryProps = {
  color: string;
};
export const TextSecondary = styled.div<TextSecondaryProps>`
  font-size: 22px;
  color: ${(props) => props.color};
`;

export const TextIdent = styled.div`
  font-size: 22px;
  height: 40px;
`;

export const TextValue = styled.div`
  font-size: 20px;
  height: 33px;
`;

export const TextIcon = styled.div`
  font-size: 30px;
  height: 40px;
`;
