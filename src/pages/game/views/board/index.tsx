/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { DrawGrid } from "./helpers/drawGrid";
import { DrawTokens } from "./helpers/drawTokens";
import { BoardConfigType, TokenType } from "../../../../@types/app.types";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { GetAdventureTokens } from "./helpers/getAdventureTokens";
import { OnBoardClick } from "./helpers/onBoardClick";
import { GetImagePath } from "./helpers/getBoardImage";
import { DrawTraps } from "./helpers/drawTraps";
import { LoadImages } from "./helpers/loadImages";
import { GetBoardSize } from "./helpers/getSizes";
import { DrawGoal } from "./helpers/drawGoal";
import LoadingContext from "../../../../shared/context/LoadingContext";
import ChatContext from "../../../../shared/context/ChatContext";
import { DrawMouseMove } from "./helpers/drawMouseMove";
import { DrawTravelPoints } from "./helpers/drawTravelPoints";

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
  const [chat] = useContext(ChatContext);
  const [loading] = useContext(LoadingContext);
  const [boardConfig, setBoardConfig] = useState<BoardConfigType>(initialValue);
  const [frameRef, setFrameRef] = useState<any>();
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [lastMouseMoveEvent, setLastMouseMoveEvent] = useState<any>();

  const canvasRef = useRef(null);

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
    setTokens(GetAdventureTokens(adventure!));
    if (!chat || !chat.ident) props.setPlayerInfo({ show: false });
  }, [adventure]);

  useEffect(() => {
    if (!boardConfig || !boardConfig.context) return;
    if (frameRef) {
      window.cancelAnimationFrame(frameRef);
      setFrameRef(undefined);
    }

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
      DrawGoal(boardConfig, adventure!);
      DrawMouseMove(lastMouseMoveEvent, boardConfig, adventure!);
      DrawTravelPoints(boardConfig, adventure!);

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
      props.playerInfo,
      props.setPlayerInfo,
      setLoadingCtx
    );
  };

  const onMouseMove = (event: MouseEvent) => {
    if (loading) return;
    setLastMouseMoveEvent(event);
  };

  const getImage = () => adventure?.location?.map.fileName;

  return (
    <S.Content
      width={boardConfig.width}
      height={boardConfig.height}
      imagePath={GetImagePath(getImage())}
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
