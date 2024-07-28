import { AdventureType, TokenType } from "../../../../../@types/app.types";

export const GetAdventureTokens = (adventure: AdventureType): TokenType[] => {
  const tokens: TokenType[] = [];
  adventure?.characteres?.forEach((character) => tokens.push(character.token!));
  adventure?.npcs?.forEach((npc) => tokens.push(npc.token!));

  return tokens;
};
