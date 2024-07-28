import { BoardConfigType, TokenType } from "../../../../../@types/app.types";
import { CharacterTypeEnum } from "../../../../../@types/constants.types";
import { GetPositionFromMatrix } from "./getPositionFromMatrix";

const myCharIdentColor = "yellow";
const npcIdentColor = "black";
const allyIdentColor = "blue";
const enemyIdentColor = "red";

export const DrawTokens = (
  ctx: any,
  tokens: TokenType[],
  boardConfig: BoardConfigType
) => {
  tokens.forEach((token) => {
    if (
      token.moveState === 1 &&
      (token.matrixX !== token.moveIntendX ||
        token.matrixY !== token.moveIntendY)
    ) {
      drawClickPoint(ctx, token, boardConfig);
    }

    drawToken(ctx, token, boardConfig);
  });
};

const drawToken = (
  ctx: any,
  token: TokenType,
  boardConfig: BoardConfigType
) => {
  const [positionX, positionY] = GetPositionFromMatrix(
    boardConfig,
    token.matrixX,
    token.matrixY
  );

  ctx.beginPath();
  ctx.arc(positionX, positionY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = token.color;
  ctx.fill();

  if (token.isMyChar) {
    ctx.beginPath();
    ctx.arc(positionX, positionY, 18, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(positionX, positionY, 20, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  if (token.isMyChar) ctx.strokeStyle = myCharIdentColor;
  else if (
    token.type === CharacterTypeEnum.Ally ||
    token.type === CharacterTypeEnum.Principal
  )
    ctx.strokeStyle = allyIdentColor;
  else if (token.type === CharacterTypeEnum.Enemy)
    ctx.strokeStyle = enemyIdentColor;
  else ctx.strokeStyle = npcIdentColor;
  ctx.stroke();
};

const drawClickPoint = (
  ctx: any,
  token: TokenType,
  boardConfig: BoardConfigType
) => {
  const [positionX, positionY] = GetPositionFromMatrix(
    boardConfig,
    token.moveIntendX!,
    token.moveIntendY!,
    false
  );

  ctx.beginPath();
  ctx.fillStyle = "rgba(0,255,0,.4)";
  ctx.fillRect(positionX, positionY, boardConfig.size, boardConfig.size);
};
