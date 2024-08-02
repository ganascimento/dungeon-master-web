import { Icon } from "@iconify/react";
import * as S from "./styles";
import { useContext } from "react";
import ChatContext from "../../../../../../shared/context/ChatContext";

type Props = {
  infoComponent: any;
};

export default function NpcInfo(props: Props) {
  const [chat, setChat] = useContext(ChatContext);

  const onTalkSelect = () => {
    setChat({
      ident: props.infoComponent?.ident,
      name: props.infoComponent?.name,
      type: props.infoComponent?.token?.type,
    });
  };

  return props.infoComponent.show ? (
    <S.PeronInfo
      id="peronInfoItem"
      positionX={props.infoComponent.positionX}
      positionY={props.infoComponent.positionY}
      selected={props.infoComponent?.ident === chat?.ident}
    >
      <div className="item">
        <span>Nome:</span> {props.infoComponent.name}
      </div>
      <div className="item">
        <span>Função:</span> {props.infoComponent.function}
      </div>
      <div className="item">
        <span>Raça:</span> {props.infoComponent.race}
      </div>
      <div className="item">
        <span>Estado:</span> {props.infoComponent.state}
      </div>
      <hr />
      <div className="contentBtn">
        <div title="Conversar" onClick={onTalkSelect}>
          <Icon icon="ic:round-message" />
        </div>
        <div title="Atacar">
          <Icon icon="material-symbols-light:swords" />
        </div>
      </div>
    </S.PeronInfo>
  ) : (
    <></>
  );
}
