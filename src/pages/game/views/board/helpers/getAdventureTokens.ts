import { AdventureType, TokenType } from "../../../../../@types/app.types";

export const GetAdventureTokens = (adventure: AdventureType): TokenType[] => {
  const tokens: TokenType[] = [];
  adventure?.allies?.forEach((ally) => tokens.push(ally.token!));
  adventure?.battle?.enemies?.forEach((enemy) =>
    tokens.push({
      ...enemy.token!,
      death: (enemy.currentLife ?? 0) <= 0,
    })
  );
  adventure?.characters?.forEach((character) => {
    tokens.push(character?.token!);
  });

  return tokens;
};
