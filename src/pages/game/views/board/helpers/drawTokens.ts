import {
  AdventureType,
  BoardConfigType,
  TokenType,
} from "../../../../../@types/app.types";
import { CharacterTypeEnum } from "../../../../../@types/constants.types";
import { GetPositionFromMatrix } from "./getSizes";

const myCharIdentColor = "yellow";
const npcIdentColor = "black";
const allyIdentColor = "blue";
const enemyIdentColor = "red";

export const DrawTokens = (
  boardConfig: BoardConfigType,
  adventure: AdventureType,
  tokens: TokenType[]
) => {
  tokens.forEach((token) => {
    if (
      (token.moveState === 1 || !token.allowGo) &&
      token.moveIntend &&
      (token.matrix.x !== token.moveIntend.x ||
        token.matrix.y !== token.moveIntend.y)
    ) {
      drawClickPoint(boardConfig.context, token, boardConfig);
    }

    drawToken(boardConfig.context, token, boardConfig);
  });
};

const drawToken = (
  context: any,
  token: TokenType,
  boardConfig: BoardConfigType
) => {
  const [positionX, positionY] = GetPositionFromMatrix(
    boardConfig,
    token.matrix.x,
    token.matrix.y
  );

  context.beginPath();
  context.arc(positionX, positionY, 20, 0, 2 * Math.PI);
  context.fillStyle = token.color;
  context.fill();

  if (token.isMyChar) {
    context.beginPath();
    context.arc(positionX, positionY, 18, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = "#000";
    context.stroke();
  }

  context.beginPath();
  context.arc(positionX, positionY, 20, 0, 2 * Math.PI);
  context.lineWidth = 3;
  if (token.isMyChar) context.strokeStyle = myCharIdentColor;
  else if (
    token.type === CharacterTypeEnum.Ally ||
    token.type === CharacterTypeEnum.Principal
  )
    context.strokeStyle = allyIdentColor;
  else if (token.type === CharacterTypeEnum.Enemy)
    context.strokeStyle = enemyIdentColor;
  else context.strokeStyle = npcIdentColor;
  context.stroke();
};

const drawClickPoint = (
  context: any,
  token: TokenType,
  boardConfig: BoardConfigType
) => {
  const [positionX, positionY] = GetPositionFromMatrix(
    boardConfig,
    token.moveIntend.x!,
    token.moveIntend.y!,
    false
  );

  context.beginPath();
  if (token.allowGo) context.fillStyle = "rgba(0,255,0,.4)";
  else context.fillStyle = "rgba(255,0,0,.4)";
  context.fillRect(positionX, positionY, boardConfig.size, boardConfig.size);
};
