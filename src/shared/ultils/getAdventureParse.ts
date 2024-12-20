import { AdventureType } from "../../@types/app.types";
import { getUserId } from "../security/authentication";

export const GetAdventureParse = (adventure?: AdventureType): AdventureType => {
  const userId = getUserId();

  if (!adventure) return {};

  return {
    ...adventure,
    characters: [...(adventure?.characters ?? [])].map((char) => {
      if (char.user && char.user.id === userId && !!char.token)
        char.token.isMyChar = true;
      return char;
    }),
  };
};
