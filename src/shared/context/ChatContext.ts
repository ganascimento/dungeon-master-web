import { createContext } from "react";
import { ChatType } from "../../@types/app.types";

const ChatContext = createContext<
  [
    ChatType | undefined,
    React.Dispatch<React.SetStateAction<ChatType | undefined>>
  ]
>([] as any);

export default ChatContext;
