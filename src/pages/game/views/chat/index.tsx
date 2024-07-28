import { useContext, useState } from "react";
import * as S from "./styles";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { FaEnvira } from "react-icons/fa6";
import { Icon } from "@iconify/react";
import ChatContext from "../../../../shared/context/ChatContext";
import { TalkStore } from "../../../../shared/store/talk.store";
import { PromptEnum } from "../../../../@types/constants.types";

export default function ChatView() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [chat, setChat] = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const talkStore = new TalkStore();

  const onRemoveSelection = () => {
    setChat(undefined);
  };

  const onSendMessage = async () => {
    const result = await talkStore.sendMessag(adventure!.id!, {
      text: message,
      target: chat?.name ?? "Mestre",
      type: !!chat?.ident ? PromptEnum.Talk : PromptEnum.TalkMaster,
    });

    if (result && result.length > 0) {
      setAdventure({ ...adventure, adventureLogs: result });
    }
    setMessage("");
  };

  return (
    <S.Content>
      <S.SpaceContent>
        {adventure?.adventureLogs?.map((adventureLog, index) => (
          <S.Tile key={index}>
            <div className="header">
              <div className="ident">
                <FaEnvira />
              </div>
            </div>
            <div
              className="body"
              dangerouslySetInnerHTML={{
                __html: adventureLog.text,
              }}
            ></div>
          </S.Tile>
        ))}
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
          />
          <div onClick={onSendMessage}>
            <Icon icon="mdi:send" />
          </div>
        </S.ContentInput>
      </S.ContentChat>
    </S.Content>
  );
}
