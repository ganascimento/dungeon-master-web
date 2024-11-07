/* eslint-disable react-hooks/exhaustive-deps */
import { FaMinus, FaPlus } from "react-icons/fa";
import * as S from "./styles";
import { ReactNode, useEffect, useState } from "react";
import { CharacterType } from "../../../../@types/app.types";
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
  const [totalPoints, setTotalPoints] = useState(1);
  const [addAbilityName, setAddAbilityName] = useState<string>();

  useEffect(() => {
    setAbilities(
      abilities.map((ability) => {
        ability.points = (props.character as any)[ability.field as any];
        return ability;
      })
    );
  }, []);

  const handleRemovePoints = (text: string) => {
    if (totalPoints === 20) return;

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

  const handleAddPoints = (text: string, abilityName: string) => {
    if (totalPoints === 0) return;
    setAddAbilityName(abilityName);

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
            <S.Button
              disabled={
                totalPoints === 1 ||
                (totalPoints === 0 && addAbilityName !== ability.text)
              }
              onClick={
                totalPoints === 1 ||
                (totalPoints === 0 && addAbilityName !== ability.text)
                  ? undefined
                  : () => handleRemovePoints(ability.text ?? "")
              }
            >
              <FaMinus />
            </S.Button>
            <div className="points">{ability.points}</div>
            <S.Button
              disabled={totalPoints === 0}
              onClick={
                totalPoints === 0
                  ? undefined
                  : () => handleAddPoints(ability.text ?? "", ability.text!)
              }
            >
              <FaPlus />
            </S.Button>
            <div className="bonus">{RenderBonusString(ability.bonus ?? 0)}</div>
          </div>
        </S.Ability>
      ))}
    </>
  );
}
