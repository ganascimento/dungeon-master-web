import { CharacterTypeEnum } from "./constants.types";

export type AdventureType = {
  id?: string;
  name?: string;
  description?: string;
  plot?: string;
  started?: boolean;
  characteres?: CharacterType[];
  adventureLogs?: AdventureLogType[];
  npcs?: NpcType[];
  location?: LocationType;
};

export type RaceType = {
  id: string;
  name: string;
  description: string;
  type: number;
};

export type ClassType = {
  id: string;
  name: string;
  description: string;
  type: number;
};

export type CharacterType = {
  id?: string;
  name?: string;
  description?: string;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  raceType?: number;
  classType?: number;
  token?: TokenType;
  type?: CharacterTypeEnum;
};

export type TokenType = {
  ident: string;
  color: string;
  matrixX: number;
  matrixY: number;
  moveState: number;
  moveIntendX?: number;
  moveIntendY?: number;
  isMyChar: boolean;
  type: CharacterTypeEnum;
};

export type BoardConfigType = {
  width: number;
  height: number;
  size: number;
  canvasRef?: any;
};

export type AdventureLogType = {
  text: string;
};

export type NpcType = {
  name: string;
  function: string;
  state: string;
  token?: TokenType;
};

export type LocationType = {
  name: string;
};

export type ChatType = {
  ident?: string;
  type?: CharacterTypeEnum;
  name?: string;
};

export type TalkRequestType = {
  text: string;
  type: string;
  target: string;
};
