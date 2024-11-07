import * as S from "./styles";
import { useContext } from "react";
import AdventureContext from "../../../../../../shared/context/AdventureContext";
import { BattleEnum } from "../../../../../../@types/constants.types";
import Wrapper from "../../../../../../shared/components/Wrapper";
import { BonusDetail } from "../../../../../../shared/components/BonusDetail";

type Props = {
  playerInfo: any;
};

export default function BoardInfo(props: Props) {
  const [adventure] = useContext(AdventureContext);

  const getX = () =>
    props.playerInfo.positionX < 0 ? 0 : props.playerInfo.positionX;

  const getY = () =>
    props.playerInfo.positionY < 0 ? 0 : props.playerInfo.positionY;

  const calcLife = () => {
    return (props.playerInfo.currentLife * 100) / props.playerInfo.totalLife;
  };

  if (
    adventure?.battle?.status === BattleEnum.InProgress &&
    props.playerInfo.token &&
    props.playerInfo.token.type
  ) {
    return (
      <S.PeronInfo
        id="peronInfoItem"
        positionX={getX()}
        positionY={getY()}
        lifePerc={calcLife()}
      >
        <div className="item">
          <span>Nome:</span> {props.playerInfo.name}
        </div>
        <hr />
        <Wrapper
          width="100%"
          alignItems="center"
          justifyContent="center"
          margin="10px 0"
        >
          <div className="lifeContent">
            <div className="life">
              <div className="text">
                {props.playerInfo.currentLife}/{props.playerInfo.totalLife}
              </div>
            </div>
          </div>
        </Wrapper>

        <BonusDetail effects={props.playerInfo.effects ?? []} />
      </S.PeronInfo>
    );
  }

  return <></>;
}
