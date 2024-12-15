import {
  AdventureType,
  BoardConfigType,
} from "../../../../../@types/app.types";
import { CharacterTypeEnum } from "../../../../../@types/constants.types";
import { GetSelectedChar } from "../../../../../shared/ultils/characterGets";
import { GetElementInPosition } from "./getElementInPosition";
import { GetMatrixFromPosition } from "./getSizes";

export const OnMouseMove = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType,
  playerInfo: any,
  setPlayerInfo: any
) => {
  try {
    const [matrixX, matrixY] = GetMatrixFromPosition(event, boardConfig);
    const elementInPosition = GetElementInPosition(adventure, matrixX, matrixY);
    const character = GetSelectedChar(adventure);
    const skill = character?.skills?.find((x) => x.selected);

    if (
      !elementInPosition ||
      elementInPosition?.type !== CharacterTypeEnum.Enemy ||
      !!skill
    ) {
      setPlayerInfo({ show: false });
      return;
    }

    setPlayerInfo({
      ...playerInfo,
      show: true,
      positionX: event.pageX - 270,
      positionY: event.pageY - 115,
      ...elementInPosition,
    });
  } catch {}
};
