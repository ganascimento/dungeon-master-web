import { CharacterType, SkillType } from "../../@types/app.types";
import { SkillEnum } from "../../@types/constants.types";
import { CalcAttributeBonus } from "./calcAttributeBonus";

export const CalcProblabyDamage = (
  skill: SkillType,
  character: CharacterType
) => {
  const [dices, total] = skill.damage.split("d").map((x) => Number(x));
  const bonus = GetBonusFromSkill(skill, character);

  return `${dices + bonus}~${dices * total + bonus}`;
};

export const GetBonusFromSkill = (
  skill: SkillType,
  character: CharacterType
): number => {
  if (skill.type === SkillEnum.Melee)
    return CalcAttributeBonus(character.strength ?? 8);
  if (skill.type === SkillEnum.Range)
    return CalcAttributeBonus(character.dexterity ?? 8);

  return -1;
};

export const RenderBonusString = (bonus: number) =>
  `${bonus < 0 ? "" : "+"}${bonus}`;
