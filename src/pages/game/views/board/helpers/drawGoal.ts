import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetPositionFromMatrix } from "./getSizes";

export const DrawGoal = (
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  const position = adventure.location?.endPosition;
  if (!position) return;

  const [positionX, positionY] = GetPositionFromMatrix(
    boardConfig,
    position.x!,
    position.y!,
    false
  );

  boardConfig.context.beginPath();
  boardConfig.context.fillStyle = "#4169E1";
  boardConfig.context.fillRect(
    positionX,
    positionY,
    boardConfig.size,
    boardConfig.size
  );
};
