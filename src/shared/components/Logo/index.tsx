import * as S from "./styles";

type Props = {
  fontSize?: string;
};

export const Logo = (props: Props) => {
  return (
    <S.Text fontSize={props.fontSize ?? "60px"}>
      Dungeon
      <br />
      Master
    </S.Text>
  );
};
