import { createContext } from "react";
import { CharacterType } from "../../@types/app.types";

const CharacterContext = createContext<
  [
    CharacterType | undefined,
    React.Dispatch<React.SetStateAction<CharacterType | undefined>>
  ]
>([] as any);

export default CharacterContext;
