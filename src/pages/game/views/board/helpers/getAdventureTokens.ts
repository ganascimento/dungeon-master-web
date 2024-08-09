import { AdventureType, TokenType } from "../../../../../@types/app.types";

export const GetAdventureTokens = (adventure: AdventureType): TokenType[] => {
  const tokens: TokenType[] = [];
  adventure?.allies?.forEach((ally) => tokens.push(ally.token!));
  adventure?.location?.npcs?.forEach((npc) => tokens.push(npc.token!));
  adventure?.location?.battle?.enemies?.forEach((enemy) =>
    tokens.push({
      ...enemy.token!,
      death: (enemy.currentLife ?? 0) <= 0,
    })
  );
  tokens.push(adventure?.character?.token!);

  return tokens;
};
