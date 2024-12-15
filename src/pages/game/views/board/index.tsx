/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { DrawGrid } from "./helpers/drawGrid";
import { DrawTokens } from "./helpers/drawTokens";
import { BoardConfigType, TokenType } from "../../../../@types/app.types";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { OnBoardClick } from "./helpers/onBoardClick";
import { GetImagePath } from "./helpers/getBoardImage";
import { DrawTraps } from "./helpers/drawTraps";
import { LoadImages } from "./helpers/loadImages";
import { GetBoardSize, GetMatrixFromPosition } from "./helpers/getSizes";
import LoadingContext from "../../../../shared/context/LoadingContext";
import { DrawMouseMove } from "./helpers/drawMouseMove";
import { GetAdventureTokens } from "./helpers/getAdventureTokens";
import { DrawTargets } from "./helpers/drawTargets";
import { OnMouseMove } from "./helpers/onMouseMove";

const initialValue: BoardConfigType = {
  height: 780,
  width: 1200,
  size: 30,
  context: undefined,
  images: [],
};

type Props = {
  playerInfo: any;
  setPlayerInfo: (value: any) => void;
};

export default function BoardView(props: Props) {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [, setLoadingCtx] = useContext(LoadingContext);
  const [loading] = useContext(LoadingContext);
  const [boardConfig, setBoardConfig] = useState<BoardConfigType>(initialValue);
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [lastMouseMoveEvent, setLastMouseMoveEvent] = useState<any>();
  const [lastMoveX, setLastMoveX] = useState<number>();
  const [lastMoveY, setLastMoveY] = useState<number>();
  const [frameRef, setFrameRef] = useState<number>();

  const canvasRef = useRef(null);

  useEffect(() => {
    setTokens(GetAdventureTokens(adventure!));
  }, [adventure]);

  useEffect(() => {
    const value = {
      ...boardConfig,
      canvasRef,
      context: (canvasRef.current as any).getContext("2d"),
      images: LoadImages(),
    };

    setBoardConfig(value);
    window.onresize = () => onResizeScreen(value);
  }, []);

  useEffect(() => {
    if (!boardConfig || !boardConfig.context) return;
    if (frameRef) window.cancelAnimationFrame(frameRef);

    const render = () => {
      boardConfig.context.clearRect(
        0,
        0,
        boardConfig.width,
        boardConfig.height
      );
      DrawGrid(boardConfig);
      DrawTokens(boardConfig, tokens);
      DrawTraps(boardConfig, adventure!);
      DrawMouseMove(lastMouseMoveEvent, boardConfig, adventure!);
      DrawTargets(boardConfig, adventure!);

      setFrameRef(window.requestAnimationFrame(render));
    };

    render();
  }, [boardConfig, tokens, lastMouseMoveEvent]);

  const onResizeScreen = (bc: BoardConfigType) => {
    const [width, height, size] = GetBoardSize();
    setBoardConfig({ ...bc, width, height, size });
  };

  const onClick = (event: MouseEvent) => {
    if (loading) return;
    OnBoardClick(
      event,
      boardConfig,
      adventure!,
      setAdventure,
      tokens,
      setTokens,
      setLoadingCtx
    );
  };

  const onMouseMove = (event: MouseEvent) => {
    if (loading) return;
    const [matrixX, matrixY] = GetMatrixFromPosition(event, boardConfig);
    if (lastMoveX !== matrixX || lastMoveY !== matrixY) {
      setLastMouseMoveEvent(event);
      OnMouseMove(
        event,
        boardConfig,
        adventure!,
        props.playerInfo,
        props.setPlayerInfo
      );
      setLastMoveX(matrixX);
      setLastMoveY(matrixY);
    }
  };

  const getImage = () => adventure?.location?.map.fileName;

  return (
    <S.Content
      width={boardConfig.width}
      height={boardConfig.height}
      $imagePath={GetImagePath(getImage())}
    >
      <canvas
        ref={canvasRef}
        width={boardConfig.width}
        height={boardConfig.height}
        onClick={(e) => onClick(e as any)}
        onMouseMove={(e) => onMouseMove(e as any)}
      />
    </S.Content>
  );
}
