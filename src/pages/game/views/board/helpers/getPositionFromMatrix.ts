import { BoardConfigType } from "../../../../../@types/app.types";

export const GetPositionFromMatrix = (
  boardConfig: BoardConfigType,
  matrixX: number,
  matrixY: number,
  isMiddle = true
) => {
  let positionX = boardConfig.size * matrixX;
  let positionY = boardConfig.size * matrixY;

  if (isMiddle) {
    positionX += boardConfig.size / 2;
    positionY += boardConfig.size / 2;
  }

  return [positionX, positionY];
};
