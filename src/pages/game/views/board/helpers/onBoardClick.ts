import {
  AdventureType,
  BoardConfigType,
  PositionType,
  TokenType,
} from "../../../../../@types/app.types";
import {
  CharacterTypeEnum,
  LocationEnum,
} from "../../../../../@types/constants.types";
import { BoardStore } from "../../../../../shared/store/board.Store";
import { GetMatrixFromPosition } from "./getSizes";

export const OnBoardClick = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
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
        if (
          !token.isMyChar ||
          (token.matrix.x === matrixX && token.matrix.y === matrixY)
        )
          return token;

        if (adventure.location?.type === LocationEnum.Safe) {
          token.allowGo = true;
          if (
            token.moveState === 1 &&
            token.moveIntend.x === matrixX &&
            token.moveIntend.y === matrixY
          ) {
            token.moveState = 0;
            token.matrix.x = matrixX;
            token.matrix.y = matrixY;
          } else {
            token.moveState = 1;
            token.moveIntend = {
              x: matrixX,
              y: matrixY,
            };
          }
          return token;
        }

        const diffX = Math.abs(matrixX - token.matrix.x);
        const diffY = Math.abs(matrixY - token.matrix.y);

        if (diffX > 1 || diffY > 1) {
          token.moveState = 0;
          token.allowGo = false;
        } else {
          token.allowGo = true;
          if (
            token.moveState === 1 &&
            token.moveIntend.x === matrixX &&
            token.moveIntend.y === matrixY
          ) {
            token.moveState = 0;
            token.matrix.x = matrixX;
            token.matrix.y = matrixY;
            SendPosition(adventure, setAdventure, token.matrix);
          } else {
            token.moveState = 1;
          }
        }
        token.moveIntend = {
          x: matrixX,
          y: matrixY,
        };

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

  if (
    adventure!.character!.token?.matrix.x === matrixX &&
    adventure!.character!.token?.matrix.y === matrixY
  )
    element = adventure!.character;

  if (!!element) return element;

  adventure.location?.npcs?.forEach((npc) => {
    if (npc.token?.matrix.x === matrixX && npc.token?.matrix.y === matrixY)
      element = npc;
  });

  return element;
};

const SendPosition = (
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
  position: PositionType
) => {
  new BoardStore()
    .sendPosition({
      adventureId: adventure.id!,
      characterIdent: adventure.character!.ident!,
      position,
    })
    .then((e) => {
      console.log(e);
      if (!!e) setAdventure(e);
    });
};
