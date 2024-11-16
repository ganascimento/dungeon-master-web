import { CharacterType } from "../../../../@types/app.types";
import { GetCharacterAbilitiesList } from "../../../../shared/ultils/abilitiesList";
import {
  CalcAttributeBonus,
  CalcTotalPoints,
} from "../../../../shared/ultils/calcAttributeBonus";
import { AbilityType } from "../../../char/views/Attributes";
import * as S from "./styles";

type Props = {
  character?: CharacterType;
};

export const AbilityList = (props: Props) => {
  if (!props.character) return <></>;

  const renderBonus = (ability: AbilityType) => {
    const bonus = CalcAttributeBonus(totalPoints(ability));
    return `${bonus < 0 ? "" : "+"}${bonus}`;
  };

  const totalPoints = (ability: AbilityType) => {
    const bonus = CalcTotalPoints(props.character!, ability.field!);
    return ability.points + bonus;
  };

  return (
    <>
      {GetCharacterAbilitiesList(props.character).map((ability, index) => (
        <S.Ability key={index}>
          <div className="content-name">
            <div>{ability.icon}</div>
            <span>{ability.text}</span>
          </div>
          <div className="content-btn">
            <div className="points">{totalPoints(ability)}</div>
            <div className="bonus">{renderBonus(ability)}</div>
          </div>
        </S.Ability>
      ))}
    </>
  );
};
