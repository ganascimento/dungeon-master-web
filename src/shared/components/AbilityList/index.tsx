import { CharacterType } from "../../../@types/app.types";
import { GetCharacterAbilitiesList } from "../../ultils/abilitiesList";
import * as S from "./styles";

type Props = {
  character?: CharacterType;
};

export const AbilityList = (props: Props) => {
  if (!props.character) return <></>;

  const renderBonus = (bonus: number) => `${bonus < 0 ? "" : "+"}${bonus}`;

  return (
    <>
      {GetCharacterAbilitiesList(props.character).map((ability, index) => (
        <S.Ability key={index}>
          <div className="content-name">
            <div>{ability.icon}</div>
            <span>{ability.text}</span>
          </div>
          <div className="content-btn">
            <div className="points">{ability.points}</div>
            <div className="bonus">{renderBonus(ability.bonus ?? 0)}</div>
          </div>
        </S.Ability>
      ))}
    </>
  );
};
