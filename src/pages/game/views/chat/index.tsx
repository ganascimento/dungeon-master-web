/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import * as S from "./styles";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { Icon } from "@iconify/react";
import { CircleLoader } from "react-spinners";
import { AdventureLogType } from "../../../../@types/app.types";
import LoadingContext from "../../../../shared/context/LoadingContext";
import { GetMyChars } from "../../../../shared/ultils/characterGets";

export default function ChatView() {
  const [adventure] = useContext(AdventureContext);
  const [loadingCtx, setLoadingCtx] = useContext(LoadingContext);

  useEffect(() => {
    setScrollToBottom();

    const activeCharacter = adventure?.battle?.turnOrder?.find(
      (turnOrder) => turnOrder.active
    )?.characterIdent;
    const myChars = GetMyChars(adventure);

    if (myChars?.map((char) => char.id).includes(activeCharacter))
      setLoadingCtx(false);
  }, [adventure]);

  const setScrollToBottom = () => {
    const element: any = document.getElementById("chat-content");
    element.scrollTop = element.scrollHeight;
  };

  const mapIcon = (log: AdventureLogType) => {
    return <Icon icon={log.icon} />;
  };

  return (
    <S.Content>
      <S.SpaceContent id="chat-content">
        {adventure?.adventureLogs?.map((adventureLog, index) => (
          <S.Tile key={index} $iconColor={adventureLog.color}>
            <div className="header">
              <div className="ident">{mapIcon(adventureLog)}</div>
              <div className="name">{adventureLog.name}</div>
            </div>
            <div
              className="body"
              dangerouslySetInnerHTML={{
                __html: adventureLog.text.replaceAll("\n", "<br />"),
              }}
            ></div>
          </S.Tile>
        ))}
        {loadingCtx ? (
          <div className="content-load">
            <CircleLoader color="#b78846" />
          </div>
        ) : (
          <></>
        )}
      </S.SpaceContent>
    </S.Content>
  );
}
