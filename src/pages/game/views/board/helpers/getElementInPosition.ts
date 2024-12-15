import { AdventureType } from "../../../../../@types/app.types";
import { CharacterTypeEnum } from "../../../../../@types/constants.types";

export const GetElementInPosition = (
  adventure: AdventureType,
  matrixX: number,
  matrixY: number
): any => {
  let element: any;

  adventure!.characters?.forEach((character) => {
    if (
      character!.token?.matrix.x === matrixX &&
      character!.token?.matrix.y === matrixY
    ) {
      element = character;
    }
  });

  if (!!element) return element;

  adventure?.characters
    ?.filter((character) => character.type === CharacterTypeEnum.Enemy)
    ?.forEach((enemy) => {
      if (
        enemy.token?.matrix.x === matrixX &&
        enemy.token?.matrix.y === matrixY
      )
        element = enemy;
    });

  return element;
};
