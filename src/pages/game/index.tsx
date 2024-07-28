/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import ChatView from "./views/chat";
import AdventureContext from "../../shared/context/AdventureContext";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import BoardView from "./views/board";
import NpcInfo from "./views/board/components/NpcInfo";

export default function GamePage() {
  const [adventure] = useContext(AdventureContext);
  const [infoComponent, setInfoComponent] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
  }, []);

  return (
    <S.Content>
      <div></div>
      <BoardView
        infoComponent={infoComponent}
        setInfoComponent={setInfoComponent}
      />
      <ChatView />
      <NpcInfo infoComponent={infoComponent} />
    </S.Content>
  );
}
