import { CharacterType } from "../../@types/app.types";
import { CharacterModeEnum } from "../../@types/constants.types";
import { CHARACTER_PARAMS } from "../configurations/characterParams";

export const CalcTotalPoints = (
  character: CharacterType,
  characterMode: CharacterModeEnum
) => {
  const base = CHARACTER_PARAMS(characterMode).BaseAttributesPoints;

  const total =
    (character.strength ?? 0) +
    (character.dexterity ?? 0) +
    (character.constitution ?? 0) +
    (character.intelligence ?? 0);

  return base - (total - 32);
};

export const CalcTotalLevelUp = (character: CharacterType) => {
  const total =
    (character.strength ?? 0) +
    (character.dexterity ?? 0) +
    (character.constitution ?? 0) +
    (character.intelligence ?? 0);

  return total - 32 - 20 - (character.level ?? 0) - 1;
};
