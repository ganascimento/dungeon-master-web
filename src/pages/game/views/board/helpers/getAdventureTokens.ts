import { AdventureType, TokenType } from "../../../../../@types/app.types";

export const GetAdventureTokens = (adventure: AdventureType): TokenType[] => {
  const tokens: TokenType[] = [];
  const activeTurnIdent = adventure?.battle?.turnOrder?.find(
    (turnOrder) => turnOrder.active
  );

  adventure?.characters?.forEach((character) => {
    tokens.push({
      ...character?.token!,
      classType: character.class?.type,
      death: (character.currentLife ?? 0) <= 0,
      current: activeTurnIdent?.characterIdent === character.id,
      mode: adventure.mode,
    });
  });

  return tokens;
};
