import { BoardConfigType } from "../../../../../@types/app.types";

export const DrawGrid = (ctx: any, boardConfig: BoardConfigType) => {
  ctx.fillStyle = "rgba(0,0,0,.2)";

  for (let i = boardConfig.size; i < boardConfig.width; i += boardConfig.size) {
    ctx.fillRect(i, 0, 1, boardConfig.height);
  }
  for (
    let i = boardConfig.size;
    i < boardConfig.height;
    i += boardConfig.size
  ) {
    ctx.fillRect(0, i, boardConfig.width, 1);
  }
};
