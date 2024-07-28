import { CircleLoader } from "react-spinners";
import * as S from "./styles";

type Props = {
  loading: boolean;
};

export const Loader = ({ loading }: Props) => {
  if (!loading) return <></>;

  return (
    <S.Background>
      <CircleLoader color="#b78846" />
    </S.Background>
  );
};
