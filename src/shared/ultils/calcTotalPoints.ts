import { CharacterType } from "../../@types/app.types";

export const CalcTotalPoints = (character: CharacterType) => {
  const total =
    (character.strength ?? 0) +
    (character.dexterity ?? 0) +
    (character.constitution ?? 0) +
    (character.intelligence ?? 0);

  return 20 - (total - 32);
};

export const CalcTotalLevelUp = (character: CharacterType) => {
  const total =
    (character.strength ?? 0) +
    (character.dexterity ?? 0) +
    (character.constitution ?? 0) +
    (character.intelligence ?? 0);

  return total - 32 - 20 - (character.level ?? 0) - 1;
};
