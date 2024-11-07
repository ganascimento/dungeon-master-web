import {
  AdventureType,
  BoardConfigType,
  PositionType,
  SkillType,
  TokenType,
} from "../../../../../@types/app.types";
import {
  BattleEnum,
  CharacterTypeEnum,
  MoveEnum,
} from "../../../../../@types/constants.types";
import { BoardStore } from "../../../../../shared/store/board.Store";
import { GetMatrixFromPosition } from "./getSizes";

type ClickActionType = {
  event: MouseEvent;
  adventure: AdventureType;
  setAdventure: (value: AdventureType) => void;
  tokens: TokenType[];
  setTokens: (value: TokenType[]) => void;
  playerInfo: any;
  setPlayerInfo: (value: any) => void;
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
  playerInfo: any,
  setPlayerInfo: (value: any) => void,
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
    playerInfo,
    setPlayerInfo,
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
        character.selected = false;
        if (character.id === elementInPosition.id) character.selected = true;
        return character;
      }),
    });
  }
};

const BattleClick = ({
  event,
  adventure,
  setAdventure,
  tokens,
  setTokens,
  playerInfo,
  setPlayerInfo,
  matrixX,
  matrixY,
  elementInPosition,
  setLoadingCtx,
}: ClickActionType): boolean => {
  const character = adventure?.characters?.find((c) => c.selected);
  const activeTurnIdent = adventure?.battle?.turnOrder?.find(
    (turnOrder) => turnOrder.active
  );
  if (!!character && character.id === activeTurnIdent?.characterIdent) {
    const skill = character.skills?.find((x) => x.selected);
    if (!skill && !elementInPosition) {
      if (character.currentStamina === 0) return false;
      setTokens(
        [...tokens].map((token) => {
          return MoveStrict(
            token,
            matrixX,
            matrixY,
            adventure,
            setAdventure,
            setLoadingCtx
          );
        })
      );
      setPlayerInfo({ show: false });
      return false;
    }
    if (!!skill) {
      const positions: any[] = [];
      if (!!elementInPosition?.token?.matrix)
        positions.push(elementInPosition.token.matrix);
      else positions.push({ x: matrixX, y: matrixY });

      if (
        ((!elementInPosition || elementInPosition?.token?.death) &&
          skill.area === 0) ||
        !checkValidCast(skill, character.token?.matrix!, positions)
      )
        return true;

      if (skill.target > 1) {
        if (!skill.selectedPositions) skill.selectedPositions = [];
        skill.selectedPositions.push(positions[0]);
      }

      if (
        skill.target > 1 &&
        skill.target !== skill.selectedPositions?.length
      ) {
        setAdventure({
          ...adventure,
          characters: [...(adventure.characters ?? [])].map((char) => {
            if (char.selected) {
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

      OnCastSkill(adventure, setAdventure, setLoadingCtx, positions, skill);
      setPlayerInfo({ show: false });
      return true;
    }
  }

  if (elementInPosition?.type === CharacterTypeEnum.Enemy)
    setPlayerInfo({
      ...playerInfo,
      show: true,
      positionX: event.pageX - 280,
      positionY: event.pageY - 115,
      ...elementInPosition,
    });
  else setPlayerInfo({ show: false });

  return false;
};

const GetElementInPosition = (
  adventure: AdventureType,
  matrixX: number,
  matrixY: number
): any => {
  let element: any;

  adventure!.characters?.forEach((character) => {
    if (
      character!.token?.matrix.x === matrixX &&
      character!.token?.matrix.y === matrixY
    ) {
      element = character;
    }
  });

  if (!!element) return element;

  adventure?.battle?.enemies?.forEach((enemy) => {
    if (enemy.token?.matrix.x === matrixX && enemy.token?.matrix.y === matrixY)
      element = enemy;
  });

  return element;
};

const MoveStrict = (
  token: TokenType,
  matrixX: number,
  matrixY: number,
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
  setLoadingCtx: (value: boolean) => void
) => {
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
      SendPosition(adventure, setAdventure, token.matrix, setLoadingCtx);
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
  setAdventure: (value: AdventureType) => void,
  position: PositionType,
  setLoadingCtx: (value: boolean) => void
) => {
  setLoadingCtx(true);

  if (adventure?.battle?.status === BattleEnum.InProgress) {
    new BoardStore()
      .characterAction({
        adventureId: adventure.id!,
        positions: [position],
        type: MoveEnum.Moviment,
      })
      .then((e) => {
        if (!!e) setAdventure(e);
      })
      .finally(() => {
        setLoadingCtx(false);
      });
  }
};

const OnCastSkill = (
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
  setLoadingCtx: (value: boolean) => void,
  positions: PositionType[],
  skill: SkillType
) => {
  setLoadingCtx(true);
  new BoardStore()
    .characterAction({
      adventureId: adventure?.id!,
      positions: skill.selectedPositions ?? positions,
      type: MoveEnum.Skill,
      skillId: skill.id,
    })
    .then((e) => {
      if (!!e) setAdventure(e);
    })
    .finally(() => {
      setLoadingCtx(false);
    });
};

const checkValidCast = (
  skill: SkillType,
  currentPosition: PositionType,
  targetPositions: PositionType[]
): boolean => {
  let isValidCast = true;

  for (var position of targetPositions) {
    isValidCast =
      position.x <= currentPosition.x + skill.range &&
      position.x >= currentPosition.x - skill.range &&
      position.y <= currentPosition.y + skill.range &&
      position.y >= currentPosition.y - skill.range;

    if (!isValidCast) break;
  }

  return isValidCast;
};
