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
  if (skill.type === SkillEnum.Melee) {
    const cAtr = character.class?.strength ?? 0;
    const cRace = character.race?.strength ?? 0;
    const calcChar = character.strength ?? 0;
    return CalcAttributeBonus(calcChar + cAtr + cRace);
  }
  if (skill.type === SkillEnum.Range) {
    const cAtr = character.class?.dexterity ?? 0;
    const cRace = character.race?.dexterity ?? 0;
    const calcChar = character.dexterity ?? 0;
    return CalcAttributeBonus(calcChar + cAtr + cRace);
  }
  if (skill.type === SkillEnum.Health) {
    const cAtr = character.class?.constitution ?? 0;
    const cRace = character.race?.constitution ?? 0;
    const calcChar = character.constitution ?? 0;
    return CalcAttributeBonus(calcChar + cAtr + cRace);
  }
  if (skill.type === SkillEnum.Mage) {
    const cAtr = character.class?.intelligence ?? 0;
    const cRace = character.race?.intelligence ?? 0;
    const calcChar = character.intelligence ?? 0;
    return CalcAttributeBonus(calcChar + cAtr + cRace);
  }

  return -1;
};

export const RenderBonusString = (bonus: number) =>
  `${bonus < 0 ? "" : "+"}${bonus}`;
