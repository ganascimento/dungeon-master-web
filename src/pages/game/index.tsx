/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import ChatView from "./views/chat";
import AdventureContext from "../../shared/context/AdventureContext";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import BoardView from "./views/board";
import BoardInfo from "./views/board/components/BoardInfo";
import CharBarView from "./views/charBar";
import { GameStore } from "../../shared/store/game.store";
import { AdventureType } from "../../@types/app.types";

export default function GamePage() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [playerInfo, setPlayerInfo] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }

    attachSocketEvents();
  }, []);

  const attachSocketEvents = async () => {
    new GameStore().attachActionResult((result: AdventureType) => {
      if (result) setAdventure(result);
    });
  };

  return (
    <S.Content>
      <CharBarView />
      <BoardView playerInfo={playerInfo} setPlayerInfo={setPlayerInfo} />
      <ChatView />
      <BoardInfo playerInfo={playerInfo} />
    </S.Content>
  );
}
