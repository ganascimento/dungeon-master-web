import {
  AdventureType,
  BoardConfigType,
  TokenType,
} from "../../../../../@types/app.types";
import { CharacterTypeEnum } from "../../../../../@types/constants.types";
import { GetMatrixFromPosition } from "./getMatrixFromPosition";

export const OnBoardClick = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType,
  tokens: TokenType[],
  setTokens: (value: TokenType[]) => void,
  infoComponent: any,
  setInfoComponent: (value: any) => void
) => {
  const [matrixX, matrixY] = GetMatrixFromPosition(event, boardConfig);
  const elementInPosition = GetElementInPosition(adventure, matrixX, matrixY);

  if (!elementInPosition) {
    setTokens(
      [...tokens].map((token) => {
        if (token.isMyChar) {
          if (
            token.moveState === 1 &&
            token.moveIntendX === matrixX &&
            token.moveIntendY === matrixY
          ) {
            token.moveState = 0;
            token.matrixX = matrixX;
            token.matrixY = matrixY;
          } else {
            token.moveState = 1;
            token.moveIntendX = matrixX;
            token.moveIntendY = matrixY;
          }
        }

        return token;
      })
    );
    setInfoComponent({ ...infoComponent, show: false });

    return;
  }
  if (elementInPosition.token.type === CharacterTypeEnum.Principal) {
    setInfoComponent({ ...infoComponent, show: false });
    return;
  }

  setInfoComponent({
    ...infoComponent,
    show: true,
    positionX: event.pageX - 280,
    positionY: event.pageY - 115,
    ...elementInPosition,
  });
};

const GetElementInPosition = (
  adventure: AdventureType,
  matrixX: number,
  matrixY: number
): any => {
  let element: any;

  adventure.characteres?.forEach((character) => {
    if (
      character.token?.matrixX === matrixX &&
      character.token?.matrixY === matrixY
    )
      element = character;
  });

  if (!!element) return element;

  adventure.npcs?.forEach((npc) => {
    if (npc.token?.matrixX === matrixX && npc.token?.matrixY === matrixY)
      element = npc;
  });

  return element;
};
