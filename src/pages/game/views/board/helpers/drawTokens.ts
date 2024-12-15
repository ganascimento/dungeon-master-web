import { BoardConfigType, TokenType } from "../../../../../@types/app.types";
import {
  CharacterTypeEnum,
  ClassEnum,
} from "../../../../../@types/constants.types";
import { GetPositionFromMatrix } from "./getSizes";

const myCharIdentColor = "yellow";
const enemyIdentColor = "red";

export const DrawTokens = (
  boardConfig: BoardConfigType,
  tokens: TokenType[]
) => {
  tokens.forEach((token) => {
    if (
      (token.moveState === 1 || !token.allowGo) &&
      token.moveIntend &&
      (token.matrix.x !== token.moveIntend.x ||
        token.matrix.y !== token.moveIntend.y) &&
      token.current
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
  const skull = boardConfig.images.find((x) => x.name === "skull");
  const warrior = boardConfig.images.find((x) => x.name === "warrior");
  const archer = boardConfig.images.find((x) => x.name === "archer");
  const priest = boardConfig.images.find((x) => x.name === "priest");
  const mage = boardConfig.images.find((x) => x.name === "mage");
  const warlock = boardConfig.images.find((x) => x.name === "warlock");

  if (!skull || !warrior || !archer || !priest || !mage || !warlock) return;

  const getImageByClass = (type: ClassEnum) => {
    switch (type) {
      case ClassEnum.Archer:
        return archer.img;
      case ClassEnum.Mage:
        return mage.img;
      case ClassEnum.Priest:
        return priest.img;
      case ClassEnum.Warlock:
        return warlock.img;
      case ClassEnum.Warrior:
        return warrior.img;
    }
  };

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
    boardConfig.context.drawImage(
      getImageByClass(token.classType!),
      positionX - 12,
      positionY - 13,
      25,
      25
    );
  }
  if (token.death) {
    boardConfig.context.drawImage(
      skull.img,
      positionX - 12,
      positionY - 13,
      25,
      25
    );
  }

  context.beginPath();
  context.arc(positionX, positionY, 20, 0, 2 * Math.PI);
  context.lineWidth = 3;
  if (token.isMyChar) {
    if (token.current) context.strokeStyle = "blue";
    else context.strokeStyle = myCharIdentColor;
  } else if (token.type === CharacterTypeEnum.Enemy)
    context.strokeStyle = enemyIdentColor;
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
  if (token.allowGo) context.fillStyle = "rgba(0,255,0,.5)";
  else context.fillStyle = "rgba(255,0,0,.5)";
  context.fillRect(positionX, positionY, boardConfig.size, boardConfig.size);
};
