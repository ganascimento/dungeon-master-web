import {
  AdventureLogEnum,
  BattleEnum,
  EffectEnum,
  CharacterTypeEnum,
  MoveEnum,
  SkillEnum,
} from "./constants.types";

export type AdventureType = {
  id?: string;
  name?: string;
  started?: boolean;
  characters?: CharacterType[];
  allies?: CharacterType[];
  adventureLogs?: AdventureLogType[];
  location?: LocationType;
  battle?: BattleType;
  difficultyLevel?: number;
};

export type RaceType = {
  id: string;
  name: string;
  type: number;
  icon: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
};

export type ClassType = {
  id: string;
  name: string;
  type: number;
  icon: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
};

export type CharacterType = {
  id?: string;
  name?: string;
  description?: string;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  race?: RaceType;
  class?: ClassType;
  token?: TokenType;
  type?: CharacterTypeEnum;
  skills?: SkillType[];
  totalLife?: number;
  currentLife?: number;
  totalStamina?: number;
  currentStamina?: number;
  selected?: boolean;
  exp?: number;
  allowUp?: boolean;
  nextUpExp?: number;
  level?: number;
  effects?: EffectType[];
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

export type LocationType = {
  ident: string;
  map: MapType;
  traps?: PositionType[];
  allys?: PositionType[];
};

export type MapType = {
  fileName: string;
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
  allowClasses?: number[];
  selectedPositions?: PositionType[];
};

export type BoarImageType = {
  img: any;
  name: string;
};

export type BattleType = {
  status: BattleEnum;
  enemies: CharacterType[];
  turnOrder: TurnOrderType[];
};

export type TurnOrderType = {
  active: boolean;
  characterIdent: string;
};

export type CharacterActionRequestType = {
  adventureId: string;
  positions: PositionType[];
  type: MoveEnum;
  skillId?: string;
};

export type CreateAdventureType = {
  name?: string;
  difficultyLevel?: number;
  characterIds?: string[];
};

export type LoginType = {
  email?: string;
  password?: string;
};

export type CreateUserType = {
  name?: string;
  email?: string;
  password?: string;
  sex?: number;
  language?: string;
};

export type AuthTokenType = {
  authenticated?: boolean;
  accessToken?: string;
};

export type SaveAdventureCharacterType = {
  id: string;
  adventureId: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  skillsIds: string[];
};

export type EffectType = {
  type: EffectEnum;
  turns: number;
  value?: number;
  roll?: string;
  active: boolean;
};
