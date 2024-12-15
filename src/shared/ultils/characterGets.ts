import { AdventureType } from "../../@types/app.types";

export const GetMyChars = (adventure?: AdventureType) =>
  adventure?.characters?.filter((character) => !!character.token?.isMyChar);

export const GetSelectedChar = (adventure?: AdventureType) =>
  GetMyChars(adventure)?.find((character) => !!character.active);
