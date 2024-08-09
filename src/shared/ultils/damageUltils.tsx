import { CharacterType, SkillType } from "../../@types/app.types";
import { SkillEnum } from "../../@types/constants.types";
import { CalcAttributeBonus } from "./calcAttributeBonus";

export const CalcProblabyRoll = (
  skill: SkillType,
  character: CharacterType
) => {
  if (skill.roll) {
    const [dices, total] = skill.roll.split("d").map((x) => Number(x));
    const bonus = GetBonusFromSkill(skill, character);

    return `${dices + bonus}~${dices * total + bonus}`;
  }

  return "";
};

export const GetBonusFromSkill = (
  skill: SkillType,
  character: CharacterType
): number => {
  if (skill.type === SkillEnum.Melee)
    return CalcAttributeBonus(character.strength ?? 8);
  if (skill.type === SkillEnum.Range)
    return CalcAttributeBonus(character.dexterity ?? 8);
  if (skill.type === SkillEnum.Health)
    return CalcAttributeBonus(character.constitution ?? 8);
  if (skill.type === SkillEnum.Mage)
    return CalcAttributeBonus(character.intelligence ?? 8);

  return -1;
};

export const RenderBonusString = (bonus: number) =>
  `${bonus < 0 ? "" : "+"}${bonus}`;
