/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { DrawGrid } from "./helpers/drawGrid";
import { DrawTokens } from "./helpers/drawTokens";
import {
  AdventureType,
  BoardConfigType,
  TokenType,
} from "../../../../@types/app.types";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { GetAdventureTokens } from "./helpers/getAdventureTokens";
import { OnBoardClick } from "./helpers/onBoardClick";
import { GetImagePath } from "./helpers/getBoardImage";
import { DrawTraps } from "./helpers/drawTraps";
import { LoadImages } from "./helpers/loadImages";
import { GetBoardSize } from "./helpers/getSizes";
import { DrawGoal } from "./helpers/drawGoal";

const initialValue: BoardConfigType = {
  height: 780,
  width: 1200,
  size: 30,
  context: undefined,
  images: [],
};

type Props = {
  infoComponent: any;
  setInfoComponent: (value: any) => void;
};

export default function BoardView(props: Props) {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [boardConfig, setBoardConfig] = useState<BoardConfigType>(initialValue);
  const [frameRef, setFrameRef] = useState<any>();
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [lastAdventure, setLastAdventure] = useState<AdventureType>();

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
    if (checkChangeAdventure()) {
      setLastAdventure(adventure!);
      setTokens(GetAdventureTokens(adventure!));
      props.setInfoComponent({ show: false });
    }
  }, [adventure]);

  /* START - DRAW */
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
      DrawTokens(boardConfig, adventure!, tokens);
      DrawTraps(boardConfig, adventure!);
      DrawGoal(boardConfig, adventure!);

      setFrameRef(window.requestAnimationFrame(render));
    };

    render();
  }, [boardConfig, tokens]);
  /* END - DRAW */

  const onResizeScreen = (bc: BoardConfigType) => {
    const [width, height, size] = GetBoardSize();
    setBoardConfig({ ...bc, width, height, size });
  };

  const onClick = (event: MouseEvent) =>
    OnBoardClick(
      event,
      boardConfig,
      adventure!,
      setAdventure,
      tokens,
      setTokens,
      props.infoComponent,
      props.setInfoComponent
    );

  const getImage = () => adventure?.location?.map.fileName;

  const checkChangeAdventure = (): boolean => {
    const lastLocation = lastAdventure?.location;
    const currentLocation = adventure?.location;
    return (
      !lastAdventure &&
      (lastLocation?.ident !== currentLocation?.ident ||
        lastLocation?.enemyTraps?.length !==
          currentLocation?.enemyTraps?.length ||
        lastLocation?.traps?.filter((x) => x.activeted).length !==
          currentLocation?.traps?.filter((x) => x.activeted).length)
    );
  };

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
      />
    </S.Content>
  );
}
