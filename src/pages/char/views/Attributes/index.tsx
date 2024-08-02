/* eslint-disable react-hooks/exhaustive-deps */
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import * as S from "./styles";
import { ReactNode, useEffect, useState } from "react";
import { CharacterType } from "../../../../@types/app.types";
import { CalcTotalPoints } from "../../../../shared/ultils/calcTotalPoints";
import { AbilitiesList } from "../../../../shared/ultils/abilitiesList";
import { CalcAttributeBonus } from "../../../../shared/ultils/calcAttributeBonus";
import { RenderBonusString } from "../../../../shared/ultils/damageUltils";

type AbilityType = {
  field?: string;
  icon?: ReactNode;
  text?: string;
  points?: number;
  bonus?: number;
};

type Props = {
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function AttributesView(props: Props) {
  const [abilities, setAbilities] = useState<AbilityType[]>(AbilitiesList);
  const [totalPoints, setTotalPoints] = useState(25);

  useEffect(() => {
    setTotalPoints(CalcTotalPoints(props.character));
  }, []);

  const handleAddPoints = (text: string) => {
    if (totalPoints === 0) return;

    setTotalPoints(totalPoints - 1);
    setAbilities(
      [...abilities].map((ability) => {
        if (ability.text === text && ability.points) {
          ability.points += 1;
          ability.bonus = CalcAttributeBonus(ability.points);
          props.setCharacter({
            ...props.character,
            [ability.field!]: ability.points,
          });
        }
        return ability;
      })
    );
  };

  const handleRemovePoints = (text: string) => {
    if (totalPoints === 25) return;

    setTotalPoints(totalPoints + 1);
    setAbilities(
      [...abilities].map((ability) => {
        if (ability.text === text && ability.points) {
          ability.points -= 1;
          ability.bonus = CalcAttributeBonus(ability.points);
          props.setCharacter({
            ...props.character,
            [ability.field!]: ability.points,
          });
        }
        return ability;
      })
    );
  };

  const handleReset = () => {
    setAbilities(AbilitiesList);
    setTotalPoints(25);
  };

  return (
    <>
      <S.Title>Atribua os pontos de habilidade para o seu personagem</S.Title>
      <S.Text>Pontos de Habilidade</S.Text>
      <S.Text>{totalPoints}</S.Text>
      <S.Margin />

      {abilities.map((ability) => (
        <S.Ability>
          <div className="content-name">
            <div>{ability.icon}</div>
            <span>{ability.text}</span>
          </div>
          <div className="content-btn">
            <div
              className="btn"
              onClick={() => handleRemovePoints(ability.text ?? "")}
            >
              <FaMinus />
            </div>
            {ability.points}
            <div
              className="btn"
              onClick={() => handleAddPoints(ability.text ?? "")}
            >
              <FaPlus />
            </div>
            <div className="bonus">{RenderBonusString(ability.bonus ?? 0)}</div>
          </div>
        </S.Ability>
      ))}
    </>
  );
}
