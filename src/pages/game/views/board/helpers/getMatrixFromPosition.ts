import { BoardConfigType } from "../../../../../@types/app.types";

export const GetMatrixFromPosition = (
  event: MouseEvent,
  boardConfig: BoardConfigType
) => {
  if (!boardConfig.canvasRef || !boardConfig.canvasRef.current) return [0, 0];
  const canvas = boardConfig.canvasRef.current;

  const matrixX = Math.floor(
    (event.pageX - canvas.offsetLeft) / boardConfig.size
  );
  const matrixY = Math.floor(
    (event.pageY - canvas.offsetTop) / boardConfig.size
  );

  return [matrixX, matrixY];
};
