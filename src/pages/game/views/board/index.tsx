/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { GetBoardSize } from "./helpers/getBoardSize";
import { DrawGrid } from "./helpers/drawGrid";
import { DrawTokens } from "./helpers/drawTokens";
import { BoardConfigType, TokenType } from "../../../../@types/app.types";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { GetAdventureTokens } from "./helpers/getAdventureTokens";
import { OnBoardClick } from "./helpers/onBoardClick";

const initialValue: BoardConfigType = {
  height: 780,
  width: 1200,
  size: 30,
};

type Props = {
  infoComponent: any;
  setInfoComponent: (value: any) => void;
};

export default function BoardView(props: Props) {
  const [adventure] = useContext(AdventureContext);
  const [boardConfig, setBoardConfig] = useState<BoardConfigType>(initialValue);
  const [ctx, setCtx] = useState<any>();
  const [frameRef, setFrameRef] = useState<any>();
  const [tokens, setTokens] = useState<TokenType[]>([]);

  const canvasRef = useRef(null);

  useEffect(() => {
    window.onresize = () => onResizeScreen();
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
    setBoardConfig({ ...boardConfig, canvasRef });
    setTokens(GetAdventureTokens(adventure!));
  }, []);

  /* DRAW */
  useEffect(() => {
    if (!ctx) return;
    if (frameRef) {
      window.cancelAnimationFrame(frameRef);
      setFrameRef(undefined);
    }

    const render = () => {
      ctx.clearRect(0, 0, boardConfig.width, boardConfig.height);
      DrawGrid(ctx, boardConfig);
      DrawTokens(ctx, tokens, boardConfig);

      setFrameRef(window.requestAnimationFrame(render));
    };

    render();
  }, [ctx, boardConfig, tokens]);

  const onResizeScreen = () => {
    const [width, height, size] = GetBoardSize();
    setBoardConfig({ width, height, size });
  };

  const onClick = (event: MouseEvent) =>
    OnBoardClick(
      event,
      boardConfig,
      adventure!,
      tokens,
      setTokens,
      props.infoComponent,
      props.setInfoComponent
    );

  return (
    <S.Content width={boardConfig.width} height={boardConfig.height}>
      <canvas
        ref={canvasRef}
        width={boardConfig.width}
        height={boardConfig.height}
        onClick={(e) => onClick(e as any)}
      />
    </S.Content>
  );
}
