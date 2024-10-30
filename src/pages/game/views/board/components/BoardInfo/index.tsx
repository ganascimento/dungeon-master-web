import { Icon } from "@iconify/react";
import * as S from "./styles";
import { useContext } from "react";
import ChatContext from "../../../../../../shared/context/ChatContext";
import {
  Boardenum,
  PromptEnum,
} from "../../../../../../@types/constants.types";
import { TalkStore } from "../../../../../../shared/store/talk.store";
import AdventureContext from "../../../../../../shared/context/AdventureContext";
import LoadingContext from "../../../../../../shared/context/LoadingContext";
import { BoardStore } from "../../../../../../shared/store/board.Store";

type Props = {
  playerInfo: any;
};

export default function BoardInfo(props: Props) {
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

  const onChangeLocation = () => {
    setLoading(true);
    new BoardStore()
      .changeLocation(adventure?.id!, props.playerInfo.ident)
      .then((e) => {
        if (!!e) setAdventure(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isMyChar = (): boolean =>
    props.playerInfo.ident === adventure?.character?.ident;

  const getX = () =>
    props.playerInfo.positionX < 0 ? 0 : props.playerInfo.positionX;

  const getY = () =>
    props.playerInfo.positionY < 0 ? 0 : props.playerInfo.positionY;

  if (
    adventure?.location?.battle?.running &&
    props.playerInfo.token &&
    props.playerInfo.token.type
  ) {
    return (
      <S.PeronInfo
        id="peronInfoItem"
        positionX={getX()}
        positionY={getY()}
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

  if (props.playerInfo.boardType === Boardenum.Travel) {
    console.log("test");
    return (
      <S.PeronInfo
        id="peronInfoItem"
        positionX={getX()}
        positionY={getY()}
        selected={props.playerInfo?.ident === chat?.ident}
      >
        <div className="item">
          <span>Nome:</span> {props.playerInfo.name}
        </div>
        <hr />
        <div className="contentBtn">
          <div
            title={`Viajar para ${props.playerInfo.name}`}
            onClick={onChangeLocation}
          >
            <Icon icon="tabler:location" />
          </div>
        </div>
      </S.PeronInfo>
    );
  }

  return props.playerInfo.show ? (
    <S.PeronInfo
      id="peronInfoItem"
      positionX={getX()}
      positionY={getY()}
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
