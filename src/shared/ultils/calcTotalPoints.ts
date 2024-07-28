import { CharacterType } from "../../@types/app.types";

export const CalcTotalPoints = (character: CharacterType) => {
  const total =
    (character.strength ?? 0) +
    (character.dexterity ?? 0) +
    (character.constitution ?? 0) +
    (character.intelligence ?? 0) +
    (character.wisdom ?? 0) +
    (character.charisma ?? 0);

  return 25 - (total - 48);
};
