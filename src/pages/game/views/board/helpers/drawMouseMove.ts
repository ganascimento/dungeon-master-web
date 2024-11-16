import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetSelectedChar } from "../../../../../shared/ultils/characterGets";
import { CheckValidCast } from "./checkIsValidCast";
import { GetMatrixFromPosition, GetRectPosition } from "./getSizes";

export const DrawMouseMove = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  const character = GetSelectedChar(adventure);
  if (!event || !character) return;

  const skill = character.skills?.find((x) => x.selected);
  if (!skill) return;

  const context = boardConfig.context;
  context.beginPath();
  const [matrixX, matrixY] = GetMatrixFromPosition(event, boardConfig);
  if (
    CheckValidCast(skill, character.token?.matrix!, [
      {
        x: matrixX,
        y: matrixY,
      },
    ])
  )
    context.fillStyle = "rgba(100,255,0,.5)";
  else context.fillStyle = "rgba(255,0,0,.5)";

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
