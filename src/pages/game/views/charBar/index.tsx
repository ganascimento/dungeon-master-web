/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import { Icon } from "@iconify/react";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { BoardStore } from "../../../../shared/store/board.Store";
import LoadingContext from "../../../../shared/context/LoadingContext";
import { CharacterType } from "../../../../@types/app.types";
import { BattleEnum } from "../../../../@types/constants.types";
import { AdventureStore } from "../../../../shared/store/adventure.store";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../../../shared/router/router.path";
import Wrapper from "../../../../shared/components/Wrapper";
import { BonusDetail } from "../../../../shared/components/BonusDetail";

export default function CharBarView() {
  const [loading, setLoading] = useContext(LoadingContext);
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [character, setCharacter] = useState<CharacterType>();

  const navigate = useNavigate();

  useEffect(() => {
    let mCharacter = adventure?.characters?.find(
      (character) => character.selected
    );
    if (!mCharacter) {
      const activeTurnIdent = adventure?.battle?.turnOrder?.find(
        (turnOrder) => turnOrder.active
      );

      if (!!activeTurnIdent) {
        setAdventure({
          ...adventure,
          characters: [...(adventure?.characters ?? [])].map((c) => {
            c.selected = false;
            if (c.id === activeTurnIdent?.characterIdent) c.selected = true;
            return c;
          }),
        });
        return;
      } else {
        setAdventure({
          ...adventure,
          characters: [...(adventure?.characters ?? [])].map((c, idx) => {
            c.selected = false;
            if (idx === 0) c.selected = true;
            return c;
          }),
        });
      }
    }

    if (!!mCharacter) setCharacter(mCharacter);
  }, [adventure]);

  const calcLifePerc = (char: CharacterType) =>
    char?.currentLife !== 0
      ? Math.floor((char?.currentLife! * 50) / char?.totalLife!)
      : 0;

  const calcStaminaPerc = (char: CharacterType) =>
    char?.currentStamina !== 0
      ? Math.floor(
          ((char?.totalStamina! - char?.currentStamina!) * 50) /
            char?.totalStamina!
        )
      : 50;

  const calcExpPerc = () => {
    if (!character) return 0;
    return ((character.exp ?? 0) * 100) / (character.nextUpExp ?? 1);
  };

  const endTurnHandle = async () => {
    setLoading(true);
    try {
      const result = await new BoardStore().characterEndTurn(adventure!.id!);
      setAdventure(result);
    } finally {
      setLoading(false);
    }
  };

  const startBattleHandle = async () => {
    setLoading(true);
    try {
      const result = await new AdventureStore().startBattle(adventure!);
      if (result !== null) setAdventure(result);
    } finally {
      setLoading(false);
    }
  };

  const exitHandle = () => {
    navigate(ROUTER_PATHS.Home);
  };

  const goProfileHandler = () => {
    navigate(ROUTER_PATHS.CharProfile);
  };

  const selectCharacter = (char: CharacterType) => {
    setAdventure({
      ...adventure,
      characters: [...(adventure?.characters ?? [])].map((c) => {
        c.selected = false;
        if (c.id === char.id) c.selected = true;
        return c;
      }),
    });
  };

  const getIsActiveCharacter = () => {
    const activeIdent = adventure?.battle?.turnOrder?.find(
      (turnOrder) => turnOrder.active
    )?.characterIdent;

    if (!activeIdent || !character || loading) return false;

    return activeIdent === character.id;
  };

  const render = () => {
    if (adventure?.battle?.status === BattleEnum.InProgress)
      return (
        <S.EndTurnBtn
          disabled={!getIsActiveCharacter()}
          onClick={getIsActiveCharacter() ? endTurnHandle : undefined}
        >
          Finalizar Turno
        </S.EndTurnBtn>
      );

    if (adventure?.battle?.status === BattleEnum.Finish)
      return (
        <S.ExitBtn onClick={getIsActiveCharacter() ? exitHandle : undefined}>
          Sair
        </S.ExitBtn>
      );

    return (
      <S.StartBtn
        onClick={
          (adventure?.battle?.status as any) === BattleEnum.InProgress ||
          loading
            ? undefined
            : startBattleHandle
        }
        disabled={
          (adventure?.battle?.status as any) === BattleEnum.InProgress ||
          loading
        }
      >
        Começar
      </S.StartBtn>
    );
  };

  return (
    <S.Content>
      <Wrapper
        gap="5px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {adventure?.characters
          ?.filter((char) => char.id !== character?.id)
          ?.map((char) => (
            <S.MinAvatar
              lifePerc={calcLifePerc(char)}
              staminaPerc={calcStaminaPerc(char)}
              onClick={() => selectCharacter(char)}
              key={char.id}
            >
              <div className="sub">
                <S.ContentIcon>
                  <Icon icon={char?.class?.icon ?? ""} />
                </S.ContentIcon>
              </div>
            </S.MinAvatar>
          ))}
      </Wrapper>

      <S.Avatar
        lifePerc={calcLifePerc(character!)}
        staminaPerc={calcStaminaPerc(character!)}
        expPerc={calcExpPerc()}
        onClick={goProfileHandler}
      >
        <div className="content">
          <div className="sub">
            <div className="attr">
              <div>{character?.currentLife}</div>
              <div>{character?.totalLife}</div>
            </div>
            <S.ContentIcon>
              <Icon icon={character?.class?.icon ?? ""} />
              <div className="char-name">{character?.name}</div>
            </S.ContentIcon>
            <div className="attr">
              <div>{character?.currentStamina}</div>
              <div>{character?.totalStamina}</div>
            </div>
          </div>
        </div>

        {!!character?.effects && character?.effects.length > 0 ? (
          <div className="popup">
            <BonusDetail effects={character?.effects ?? []} />
          </div>
        ) : (
          <></>
        )}
      </S.Avatar>
      <S.ActionBar>
        {character?.skills?.map((skill, index) => (
          <SkillDetails
            skill={skill}
            character={character!}
            isSelected={true}
            setCharacter={(e) =>
              setAdventure({
                ...adventure,
                characters: [...(adventure?.characters ?? [])].map((c) => {
                  if (c.id === character.id) return character;
                  return c;
                }),
              })
            }
            key={index}
            iconPosition="left"
            disable={
              !getIsActiveCharacter() ||
              (character?.currentStamina ?? 0) < skill.staminaCost ||
              adventure?.battle?.status !== BattleEnum.InProgress
            }
          />
        ))}
      </S.ActionBar>
      {render()}
    </S.Content>
  );
}
