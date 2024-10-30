import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { GetPositionFromMatrix } from "./getSizes";

export const DrawTravelPoints = (
  boardConfig: BoardConfigType,
  adventure: AdventureType
) => {
  const imageTravelPoint = boardConfig.images.find(
    (x) => x.name === "travelPoint"
  );

  if (!imageTravelPoint) return;

  const context = boardConfig.context;
  adventure.locations
    ?.filter((location) => !!location.mapPosition)
    ?.forEach((location) => {
      const [positionX, positionY] = GetPositionFromMatrix(
        boardConfig,
        location.mapPosition.x!,
        location.mapPosition.y!,
        false
      );
      context.beginPath();
      context.fillStyle = "rgba(128,0,128,.4)";
      context.fillRect(
        positionX,
        positionY,
        boardConfig.size,
        boardConfig.size
      );

      context.beginPath();
      boardConfig.context.drawImage(
        imageTravelPoint.img,
        positionX + 3,
        positionY + 3,
        25,
        25
      );
    });
};
