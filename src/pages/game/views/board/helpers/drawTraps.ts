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
  const imageThief = boardConfig.images.find((x) => x.name === "thief");
  const imageTrapActivated = boardConfig.images.find(
    (x) => x.name === "trapActivated"
  );

  if (!location || !imageTrap || !imageThief || !imageTrapActivated) return;

  location.traps?.forEach((trap) => {
    const [positionX, positionY] = GetPositionFromMatrix(
      boardConfig,
      trap.position.x,
      trap.position.y,
      false
    );

    boardConfig.context.beginPath();
    if (trap.activeted)
      boardConfig.context.drawImage(
        imageTrapActivated.img,
        positionX,
        positionY,
        35,
        35
      );
    else
      boardConfig.context.drawImage(
        imageTrap.img,
        positionX,
        positionY,
        35,
        35
      );
  });

  location.enemyTraps?.forEach((enemyTrap) => {
    const [positionX, positionY] = GetPositionFromMatrix(
      boardConfig,
      enemyTrap.x,
      enemyTrap.y,
      false
    );

    boardConfig.context.beginPath();
    boardConfig.context.drawImage(imageThief.img, positionX, positionY, 35, 35);
  });
};
