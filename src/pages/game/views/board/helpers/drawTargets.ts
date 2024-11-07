import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetPositionFromMatrix } from "./getSizes";

export const DrawTargets = (
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  const character = adventure?.characters?.find((c) => c.selected);
  if (!character) return;

  const skill = character.skills?.find((x) => x.selected);
  if (!skill) return;

  const context = boardConfig.context;

  context.beginPath();
  context.fillStyle = "rgba(125,33,129,.5)";
  skill.selectedPositions?.forEach((position) => {
    const [positionX, positionY] = GetPositionFromMatrix(
      boardConfig,
      position.x,
      position.y,
      false
    );
    context.fillRect(positionX, positionY, boardConfig.size, boardConfig.size);
  });
};
