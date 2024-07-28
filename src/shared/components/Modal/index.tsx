import { ReactNode } from "react";
import * as S from "./styles";
import { FaX } from "react-icons/fa6";

type Props = {
  children?: ReactNode;
  title: string;
  onClose: () => void;
  isOpen: boolean;
};

export const Modal = (props: Props) => {
  if (!props.isOpen) return <></>;

  return (
    <S.Background>
      <S.ContentModal className="box">
        <div className="box-inner">
          <S.Header>
            <S.CloseBtn onClick={props.onClose}>
              <FaX />
            </S.CloseBtn>
          </S.Header>
          <div>{props.title}</div>
          <S.ModalBody>{props.children ?? <></>}</S.ModalBody>
        </div>
      </S.ContentModal>
    </S.Background>
  );
};
