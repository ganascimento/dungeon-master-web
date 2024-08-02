import { BoardConfigType } from "../../../../../@types/app.types";

export const DrawGrid = (boardConfig: BoardConfigType) => {
  boardConfig.context.fillStyle = "rgba(0,0,0,.2)";

  for (let i = boardConfig.size; i < boardConfig.width; i += boardConfig.size) {
    boardConfig.context.fillRect(i, 0, 1, boardConfig.height);
  }
  for (
    let i = boardConfig.size;
    i < boardConfig.height;
    i += boardConfig.size
  ) {
    boardConfig.context.fillRect(0, i, boardConfig.width, 1);
  }
};
