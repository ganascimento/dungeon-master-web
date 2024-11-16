import { CharacterType } from "../../@types/app.types";

export const CalcAttributeBonus = (points: number) => {
  const bonus = points - 8;
  if (bonus <= 1) return -1;
  if (bonus - 2 <= 1) return 0;
  return Math.floor((bonus - 2) / 2);
};

export const CalcTotalPoints = (
  character: CharacterType,
  abilityName: string
) => {
  const classBonus = (character?.class as any)[abilityName!];
  const raceBonus = (character?.race as any)[abilityName!];
  return classBonus + raceBonus;
};
