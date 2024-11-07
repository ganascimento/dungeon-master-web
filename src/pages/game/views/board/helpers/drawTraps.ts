import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetPositionFromMatrix } from "./getSizes";

export const DrawTraps = (
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  const location = adventure.location;
  const imageTrap = boardConfig.images.find((x) => x.name === "trap");
  const imageTrapActivated = boardConfig.images.find(
    (x) => x.name === "trapActivated"
  );

  if (!location || !imageTrap || !imageTrapActivated) return;

  location.traps?.forEach((trap) => {
    const [positionX, positionY] = GetPositionFromMatrix(
      boardConfig,
      trap.x,
      trap.y,
      false
    );

    boardConfig.context.beginPath();
    boardConfig.context.drawImage(imageTrap.img, positionX, positionY, 35, 35);
  });
};
