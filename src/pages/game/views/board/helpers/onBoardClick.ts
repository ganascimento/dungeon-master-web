import {
  AdventureType,
  BoardConfigType,
  PositionType,
  SkillType,
  TokenType,
} from "../../../../../@types/app.types";
import {
  BattleEnum,
  EffectEnum,
  MoveEnum,
} from "../../../../../@types/constants.types";
import { GameStore } from "../../../../../shared/store/game.store";
import { GetSelectedChar } from "../../../../../shared/ultils/characterGets";
import { PlaySkillSong } from "../../../../../shared/ultils/playSong";
import { CheckValidCast } from "./checkIsValidCast";
import { GetElementInPosition } from "./getElementInPosition";
import { GetMatrixFromPosition } from "./getSizes";

type ClickActionType = {
  event: MouseEvent;
  adventure: AdventureType;
  setAdventure: (value: AdventureType) => void;
  tokens: TokenType[];
  setTokens: (value: TokenType[]) => void;
  matrixX: number;
  matrixY: number;
  elementInPosition: any;
  setLoadingCtx: (value: boolean) => void;
};

export const OnBoardClick = (
  event: MouseEvent,
  boardConfig: BoardConfigType,
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
  tokens: TokenType[],
  setTokens: (value: TokenType[]) => void,
  setLoadingCtx: (value: boolean) => void
) => {
  const [matrixX, matrixY] = GetMatrixFromPosition(event, boardConfig);
  const elementInPosition = GetElementInPosition(adventure, matrixX, matrixY);

  const propData: ClickActionType = {
    event,
    adventure,
    setAdventure,
    tokens,
    setTokens,
    matrixX,
    matrixY,
    elementInPosition,
    setLoadingCtx,
  };

  if (adventure?.battle?.status === BattleEnum.InProgress) {
    const isReturn = BattleClick(propData);
    if (isReturn) return;
  }

  if (
    !!elementInPosition &&
    !!elementInPosition.token &&
    !!elementInPosition.token.isMyChar
  ) {
    setAdventure({
      ...adventure,
      characters: [...(adventure.characters ?? [])].map((character) => {
        character.active = false;
        if (character.id === elementInPosition.id) character.active = true;
        return character;
      }),
    });
  }
};

const BattleClick = ({
  adventure,
  setAdventure,
  tokens,
  setTokens,
  matrixX,
  matrixY,
  elementInPosition,
  setLoadingCtx,
}: ClickActionType): boolean => {
  const character = GetSelectedChar(adventure);
  const activeTurnIdent = adventure?.battle?.turnOrder?.find(
    (turnOrder) => turnOrder.active
  );
  if (!!character && character.id === activeTurnIdent?.characterIdent) {
    const skill = character.skills?.find((x) => x.selected);
    if (!skill && !elementInPosition) {
      if (character.currentStamina === 0) return false;
      setTokens(
        [...tokens].map((token) => {
          return MoveStrict(token, matrixX, matrixY, adventure, setLoadingCtx);
        })
      );
      return false;
    }
    if (!!skill) {
      const positions: any[] = [];
      if (!!elementInPosition?.token?.matrix)
        positions.push(elementInPosition.token.matrix);
      else positions.push({ x: matrixX, y: matrixY });

      if (
        ((!elementInPosition || elementInPosition?.token?.death) &&
          skill.area === 0 &&
          skill.effects?.find((effect) => effect?.type !== EffectEnum.Move)) ||
        !CheckValidCast(skill, character.token?.matrix!, positions)
      )
        return true;

      if (skill.target > 1) {
        if (!skill.selectedPositions) skill.selectedPositions = [];
        skill.selectedPositions.push(positions[0]);

        if (skill.target !== skill.selectedPositions?.length) {
          setAdventure({
            ...adventure,
            characters: [...(adventure.characters ?? [])].map((char) => {
              if (char.active) {
                char.skills = char.skills?.map((s) => {
                  if (s.id === skill.id)
                    s.selectedPositions = skill.selectedPositions;
                  return s;
                });
              }
              return char;
            }),
          });

          return true;
        }
      }

      OnCastSkill(adventure, setLoadingCtx, positions, skill);
      return true;
    }
  }

  return false;
};

const MoveStrict = (
  token: TokenType,
  matrixX: number,
  matrixY: number,
  adventure: AdventureType,
  setLoadingCtx: (value: boolean) => void
): TokenType => {
  if (!token.current) return token;

  const diffX = Math.abs(matrixX - token.matrix.x);
  const diffY = Math.abs(matrixY - token.matrix.y);

  if (diffX > 1 || diffY > 1) {
    token.moveState = 0;
    token.allowGo = false;
  } else {
    token.allowGo = true;
    if (
      token.moveState === 1 &&
      token.moveIntend.x === matrixX &&
      token.moveIntend.y === matrixY
    ) {
      token.moveState = 0;
      token.matrix.x = matrixX;
      token.matrix.y = matrixY;
      SendPosition(adventure, token.matrix, setLoadingCtx);
    } else {
      token.moveState = 1;
    }
  }
  token.moveIntend = {
    x: matrixX,
    y: matrixY,
  };

  return token;
};

const SendPosition = (
  adventure: AdventureType,
  position: PositionType,
  setLoadingCtx: (value: boolean) => void
) => {
  setLoadingCtx(true);

  if (adventure?.battle?.status === BattleEnum.InProgress) {
    new GameStore().characterAction({
      adventureId: adventure.id!,
      positions: [position],
      type: MoveEnum.Moviment,
    });
  }
};

const OnCastSkill = (
  adventure: AdventureType,
  setLoadingCtx: (value: boolean) => void,
  positions: PositionType[],
  skill: SkillType
) => {
  PlaySkillSong(skill);
  setLoadingCtx(true);
  new GameStore().characterAction({
    adventureId: adventure?.id!,
    positions: skill.selectedPositions ?? positions,
    type: MoveEnum.Skill,
    skillId: skill.id,
  });
};
