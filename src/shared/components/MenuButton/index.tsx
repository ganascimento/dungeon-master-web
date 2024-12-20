import { PulseLoader } from "react-spinners";
import * as S from "./styles";
import { PlayClickSong } from "../../ultils/playSong";

type Props = {
  text: string;
  disabled?: boolean;
  width?: number;
  onClick?: () => void;
  marginBottom?: string;
  loading?: boolean;
  active?: boolean;
  color?: string;
};

export const MenuButton = (props: Props) => {
  return (
    <S.Content
      disabled={props.disabled}
      width={props.width}
      $marginBottom={props.marginBottom}
      $active={props.active}
      onClick={
        props.disabled || props.loading
          ? undefined
          : () => {
              PlayClickSong();
              if (props.onClick) props.onClick();
            }
      }
    >
      <S.SubContent
        disabled={props.disabled}
        width={props.width}
        $marginBottom={props.marginBottom}
        $active={props.active}
        onClick={undefined}
        color={props.color}
      >
        {props.loading ? (
          <PulseLoader size={8} color="rgba(0,0,0,.5)" />
        ) : (
          props.text
        )}
      </S.SubContent>
    </S.Content>
  );
};
