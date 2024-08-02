import { AdventureType, TokenType } from "../../../../../@types/app.types";

export const GetAdventureTokens = (adventure: AdventureType): TokenType[] => {
  const tokens: TokenType[] = [];
  adventure?.allies?.forEach((ally) => tokens.push(ally.token!));
  adventure?.location?.npcs?.forEach((npc) => tokens.push(npc.token!));
  tokens.push(adventure?.character?.token!);

  return tokens;
};
