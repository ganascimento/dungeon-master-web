import { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { Icon } from "@iconify/react";
import ChatContext from "../../../../shared/context/ChatContext";
import { TalkStore } from "../../../../shared/store/talk.store";
import {
  AdventureLogEnum,
  PromptEnum,
} from "../../../../@types/constants.types";
import { CircleLoader } from "react-spinners";
import { AdventureLogType } from "../../../../@types/app.types";
import LoadingContext from "../../../../shared/context/LoadingContext";

export default function ChatView() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [loadingCtx] = useContext(LoadingContext);
  const [chat, setChat] = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const talkStore = new TalkStore();

  useEffect(() => {
    setScrollToBottom();
  }, [adventure]);

  const onRemoveSelection = () => {
    setChat(undefined);
  };

  const onSendMessage = async () => {
    setLoading(true);

    try {
      const result = await talkStore.sendMessag(adventure!.id!, {
        text: message,
        target: chat?.name ?? "Mestre",
        type: !!chat?.ident ? PromptEnum.Talk : PromptEnum.TalkMaster,
      });

      if (result) {
        setAdventure(result);
        setScrollToBottom();
      }
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const setScrollToBottom = () => {
    const element: any = document.getElementById("chat-content");
    element.scrollTop = element.scrollHeight;
  };

  const mapIcon = (log: AdventureLogType) => {
    if (log.type === AdventureLogEnum.Character)
      return <Icon icon={adventure?.character?.class?.icon ?? ""} />;
    return <Icon icon={log.icon} />;
  };

  return (
    <S.Content>
      <S.SpaceContent id="chat-content">
        {adventure?.adventureLogs?.map((adventureLog, index) => (
          <S.Tile key={index} iconColor={adventureLog.color}>
            <div className="header">
              <div className="ident">{mapIcon(adventureLog)}</div>
              <div className="name">{adventureLog.name}</div>
            </div>
            <div
              className="body"
              dangerouslySetInnerHTML={{
                __html: adventureLog.text.replace("\n", "<br />"),
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

      <S.ContentChat>
        <S.ContentTo>
          <span>Enviando mensagem para:</span>
          {!chat && !(chat as any)?.ident ? (
            <div className="to">Mestre</div>
          ) : (
            <div className="to">
              {chat?.name}{" "}
              <div className="btn" onClick={onRemoveSelection}>
                <Icon icon="material-symbols-light:close" />
              </div>
            </div>
          )}
        </S.ContentTo>
        <S.ContentInput enable={message.length >= 10}>
          <textarea
            placeholder="Mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <CircleLoader color="#b78846" />
          ) : (
            <div onClick={onSendMessage}>
              <Icon icon="mdi:send" />
            </div>
          )}
        </S.ContentInput>
      </S.ContentChat>
    </S.Content>
  );
}
