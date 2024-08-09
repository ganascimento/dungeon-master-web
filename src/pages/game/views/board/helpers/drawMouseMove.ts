import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetRectPosition } from "./getSizes";

export const DrawMouseMove = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  if (!event) return;

  const skill = adventure.character?.skills?.find((x) => x.selected);
  if (!skill) return;

  const context = boardConfig.context;

  context.beginPath();
  context.fillStyle = "rgba(255,255,0,.5)";
  if (skill.area === 0) {
    const [positionX, positionY] = GetRectPosition(event, boardConfig, false);
    context.fillRect(positionX, positionY, boardConfig.size, boardConfig.size);
  } else {
    const [positionX, positionY] = GetRectPosition(event, boardConfig);
    const mSize = boardConfig.size * skill.area;
    const mPositionX = positionX - mSize / 2;
    const mPositionY = positionY - mSize / 2;
    context.fillRect(mPositionX, mPositionY, mSize, mSize);
  }
};
