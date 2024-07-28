import { PulseLoader } from "react-spinners";
import * as S from "./styles";

type Props = {
  text: string;
  disabled?: boolean;
  width?: number;
  onClick?: () => void;
  marginBottom?: string;
  title?: string;
  loading?: boolean;
};

export const MenuButton = (props: Props) => {
  return (
    <S.Content
      {...props}
      onClick={props.disabled || props.loading ? undefined : props.onClick}
    >
      <S.SubContent {...props} onClick={undefined}>
        {props.loading ? (
          <PulseLoader size={8} color="rgba(0,0,0,.5)" />
        ) : (
          props.text
        )}
      </S.SubContent>
    </S.Content>
  );
};
