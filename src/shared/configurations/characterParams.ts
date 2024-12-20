import { CharacterModeEnum } from "../../@types/constants.types";

export const CHARACTER_PARAMS = (mode: CharacterModeEnum) => {
  return {
    BaseLevel: mode === CharacterModeEnum.Normal ? 1 : 4,
    BaseAttributesPoints: mode === CharacterModeEnum.Normal ? 20 : 23,
    BaseTotalToDisable: mode === CharacterModeEnum.Normal ? 17 : 19,
    MaxSkills: mode === CharacterModeEnum.Normal ? 6 : 9,
  };
};
