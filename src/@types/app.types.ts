import {
  AdventureLogEnum,
  CharacterTypeEnum,
  LocationEnum,
  MoveEnum,
  PromptEnum,
  SkillEnum,
} from "./constants.types";

export type AdventureType = {
  id?: string;
  name?: string;
  description?: string;
  plot?: string;
  started?: boolean;
  character?: CharacterType;
  allies?: CharacterType[];
  adventureLogs?: AdventureLogType[];
  location?: LocationType;
  mainGoal?: string;
  currentGoal?: string;
};

export type RaceType = {
  id: string;
  name: string;
  description: string;
  type: number;
  icon: string;
};

export type ClassType = {
  id: string;
  name: string;
  description: string;
  type: number;
  icon: string;
};

export type CharacterType = {
  ident?: string;
  name?: string;
  description?: string;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  race?: RaceType;
  class?: ClassType;
  token?: TokenType;
  type?: CharacterTypeEnum;
  skills?: SkillType[];
  totalLife?: number;
  currentLife?: number;
  totalStamina?: number;
  currentStamina?: number;
};

export type TokenType = {
  ident: string;
  color: string;
  matrix: PositionType;
  moveIntend: PositionType;
  moveState: number;
  isMyChar: boolean;
  type: CharacterTypeEnum;
  allowGo?: boolean;
  death?: boolean;
};

export type BoardConfigType = {
  width: number;
  height: number;
  size: number;
  context: any;
  canvasRef?: any;
  images: BoarImageType[];
};

export type AdventureLogType = {
  text: string;
  name: string;
  type: AdventureLogEnum;
  icon: string;
  color: string;
};

export type NpcType = {
  name: string;
  function: string;
  state: string;
  token?: TokenType;
};

export type LocationType = {
  ident: string;
  name: string;
  isCurrent: boolean;
  type: LocationEnum;
  map: MapType;
  npcs?: NpcType[];
  traps?: TrapType[];
  enemyTraps?: PositionType[];
  allys?: PositionType[];
  endPosition?: PositionType;
  battle?: BattleType;
};

export type MapType = {
  fileName: string;
};

export type ChatType = {
  ident?: string;
  type?: CharacterTypeEnum;
  name?: string;
};

export type TalkRequestType = {
  text: string;
  type: PromptEnum;
  target: string;
};

export type PositionType = {
  x: number;
  y: number;
};

export type SkillType = {
  id: string;
  name: string;
  roll: string;
  type: SkillEnum;
  icon: string;
  turns: number;
  range: number;
  target: number;
  area: number;
  staminaCost: number;
  description?: string;
  currentTurn: number;
  typeString: string;
  selected?: boolean;
  duration?: boolean;
};

export type TrapType = {
  activeted: boolean;
  ident: string;
  position: PositionType;
};

export type BoarImageType = {
  img: any;
  name: string;
};

export type BoardRequestType = {
  adventureId: string;
  position: PositionType;
};

export type BattleType = {
  running: boolean;
  enemies: CharacterType[];
  turnOrder: TurnOrderType[];
};

export type TurnOrderType = {
  active: boolean;
  ident: string;
};

export type CharacterMoveRequestType = {
  adventureId: string;
  positions: PositionType[];
  type: MoveEnum;
  skillId?: string;
};
