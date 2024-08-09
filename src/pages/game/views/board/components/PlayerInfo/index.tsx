import { Icon } from "@iconify/react";
import * as S from "./styles";
import { useContext } from "react";
import ChatContext from "../../../../../../shared/context/ChatContext";
import { PromptEnum } from "../../../../../../@types/constants.types";
import { TalkStore } from "../../../../../../shared/store/talk.store";
import AdventureContext from "../../../../../../shared/context/AdventureContext";
import LoadingContext from "../../../../../../shared/context/LoadingContext";

type Props = {
  playerInfo: any;
};

export default function PlayerInfo(props: Props) {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [, setLoading] = useContext(LoadingContext);
  const [chat, setChat] = useContext(ChatContext);

  const onTalkSelect = () => {
    setChat({
      ident: props.playerInfo?.ident,
      name: props.playerInfo?.name,
      type: props.playerInfo?.token?.type,
    });
  };

  const onCheckPhysicalState = () => {
    setLoading(true);
    new TalkStore()
      .sendMessag(adventure?.id!, {
        target: props.playerInfo.ident,
        text: "",
        type: PromptEnum.PhysicalState,
      })
      .then((e) => {
        if (!!e) setAdventure(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isMyChar = (): boolean =>
    props.playerInfo.ident === adventure?.character?.ident;

  if (
    adventure?.location?.battle?.running &&
    props.playerInfo.token &&
    props.playerInfo.token.type
  ) {
    return (
      <S.PeronInfo
        id="peronInfoItem"
        positionX={props.playerInfo.positionX}
        positionY={props.playerInfo.positionY}
        selected={props.playerInfo?.ident === chat?.ident}
      >
        <div className="item">
          <span>Nome:</span> {props.playerInfo.name}
        </div>
        <hr />
        <div className="contentBtn">
          {!isMyChar() ? (
            <div title="Estado fisico" onClick={onCheckPhysicalState}>
              <Icon icon="game-icons:strong" />
            </div>
          ) : (
            <div />
          )}
        </div>
      </S.PeronInfo>
    );
  }

  return props.playerInfo.show ? (
    <S.PeronInfo
      id="peronInfoItem"
      positionX={props.playerInfo.positionX}
      positionY={props.playerInfo.positionY}
      selected={props.playerInfo?.ident === chat?.ident}
    >
      <div className="item">
        <span>Nome:</span> {props.playerInfo.name}
      </div>
      <div className="item">
        <span>Função:</span> {props.playerInfo.function}
      </div>
      <div className="item">
        <span>Raça:</span> {props.playerInfo.race}
      </div>
      <div className="item">
        <span>Estado:</span> {props.playerInfo.state}
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
