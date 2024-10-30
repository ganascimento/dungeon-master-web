import {
  AdventureType,
  BoardConfigType,
  PositionType,
  SkillType,
  TokenType,
} from "../../../../../@types/app.types";
import {
  Boardenum,
  CharacterTypeEnum,
  LocationEnum,
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

  if (adventure.location?.battle?.running) BattleClick(propData);
  else NoBattleClick(propData);
};

const NoBattleClick = ({
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
}: ClickActionType) => {
  if (elementInPosition?.token?.type === CharacterTypeEnum.Principal) {
    setPlayerInfo({ ...playerInfo, show: false, boardType: undefined });
    return;
  }

  if (!elementInPosition) {
    setTokens(
      [...tokens].map((token) => {
        if (
          !token.isMyChar ||
          (token.matrix.x === matrixX && token.matrix.y === matrixY)
        )
          return token;

        if (adventure.location?.type === LocationEnum.Safe) {
          token.allowGo = true;
          if (
            token.moveState === 1 &&
            token.moveIntend.x === matrixX &&
            token.moveIntend.y === matrixY
          ) {
            token.moveState = 0;
            token.matrix.x = matrixX;
            token.matrix.y = matrixY;
          } else {
            token.moveState = 1;
            token.moveIntend = {
              x: matrixX,
              y: matrixY,
            };
          }
          return token;
        }

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

    setPlayerInfo({ ...playerInfo, show: false });
    return;
  }

  setPlayerInfo({
    ...playerInfo,
    show: true,
    positionX: event.pageX - 280,
    positionY: event.pageY - 115,
    ...elementInPosition,
    boardType: elementInPosition.boardType,
  });
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
}: ClickActionType) => {
  const skill = adventure.character?.skills?.find((x) => x.selected);

  if (!skill && !elementInPosition) {
    if (adventure.character?.currentStamina === 0) return;
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
    return;
  }

  if (!!skill) {
    if (
      (!elementInPosition || elementInPosition?.token?.death) &&
      skill.area === 0
    )
      return;
    let positions = [];

    if (!!elementInPosition?.token?.matrix)
      positions.push(elementInPosition.token.matrix);
    else positions.push({ x: matrixX, y: matrixY });

    onCastSkill(adventure, setAdventure, setLoadingCtx, positions);
    setPlayerInfo({ show: false });
    return;
  }

  setPlayerInfo({
    ...playerInfo,
    show: true,
    positionX: event.pageX - 280,
    positionY: event.pageY - 115,
    ...elementInPosition,
  });
};

const GetElementInPosition = (
  adventure: AdventureType,
  matrixX: number,
  matrixY: number
): any => {
  let element: any;

  adventure.locations
    ?.filter((location) => !!location.mapPosition)
    ?.forEach((location) => {
      if (
        location.mapPosition.x === matrixX &&
        location.mapPosition.y === matrixY
      )
        element = {
          ...location,
          boardType: Boardenum.Travel,
        };
    });

  if (!!element) return element;

  if (
    adventure!.character!.token?.matrix.x === matrixX &&
    adventure!.character!.token?.matrix.y === matrixY
  )
    return {
      ...adventure!.character,
      boardType: Boardenum.Person,
    };

  adventure.location?.npcs?.forEach((npc) => {
    if (npc.token?.matrix.x === matrixX && npc.token?.matrix.y === matrixY)
      element = npc;
  });

  if (!!element) return element;

  adventure.location?.battle?.enemies?.forEach((enemy) => {
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

  if (adventure.location?.battle?.running) {
    new BoardStore()
      .characterMove({
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
  } else {
    new BoardStore()
      .sendPosition({
        adventureId: adventure.id!,
        position,
      })
      .then((e) => {
        if (!!e) setAdventure(e);
      })
      .finally(() => {
        setLoadingCtx(false);
      });
  }
};

const onCastSkill = (
  adventure: AdventureType,
  setAdventure: (value: AdventureType) => void,
  setLoadingCtx: (value: boolean) => void,
  positions: PositionType[]
) => {
  const skill = adventure?.character?.skills?.find((x) => x.selected);
  if (
    !skill ||
    !checkValidCast(skill, adventure.character?.token?.matrix!, positions)
  )
    return;

  setLoadingCtx(true);
  new BoardStore()
    .characterMove({
      adventureId: adventure?.id!,
      positions,
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
