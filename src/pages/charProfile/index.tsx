/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Content } from "../../shared/components/Content";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { AbilityList } from "./components/AbilityList";
import AdventureContext from "../../shared/context/AdventureContext";
import { Icon } from "@iconify/react";
import { SkillDetails } from "../../shared/components/SkillDetails";
import { CharacterType } from "../../@types/app.types";
import { GameButton } from "../../shared/components/GameButton";
import Wrapper from "../../shared/components/Wrapper";
import { BattleEnum } from "../../@types/constants.types";
import { GetMyChars, GetSelectedChar } from "../../shared/ultils/characterGets";

export default function CharProfilePage() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [character, setCharacter] = useState<CharacterType>();

  const navigate = useNavigate();

  useEffect(() => {
    setCharacter(GetSelectedChar(adventure));
  }, [adventure]);

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoToUpLevel = () => {
    navigate(ROUTER_PATHS.CharUpLevel);
  };

  const handleNextPersonToUpLevel = () => {
    setAdventure({
      ...adventure,
      characters: [...(adventure?.characters ?? [])].map((char) => {
        char.active = false;
        if (char.allowUp && char.id !== character?.id && !!char.token?.isMyChar)
          char.active = true;
        return char;
      }),
    });
  };

  if (!character) return <></>;

  return (
    <Content type={2}>
      <S.Content>
        <S.ContentProfile>
          <div className="content-header">
            <div className="header-icon">
              {<Icon icon={character.class?.icon ?? ""} />}
            </div>
          </div>
          <S.Name>{character.name}</S.Name>
          <S.Race>{character.race?.name}</S.Race>
          <AbilityList character={character} />
          <S.ContentSkills>
            {character.skills?.map((skill, index) => (
              <SkillDetails skill={skill} character={character} key={index} />
            ))}
          </S.ContentSkills>
        </S.ContentProfile>
      </S.Content>

      <Wrapper justifyContent="end" width="100%">
        <GameButton onClick={handleBack} text="Voltar" />

        {!adventure?.battle || adventure?.battle?.status === BattleEnum.Win ? (
          <>
            {!!GetMyChars(adventure)?.find(
              (char) => char.allowUp && char.id !== character.id
            ) ? (
              <GameButton
                onClick={handleNextPersonToUpLevel}
                text="Próximo personagem"
              />
            ) : (
              <></>
            )}

            {character.allowUp ? (
              <GameButton onClick={handleGoToUpLevel} text="Subir de nível" />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </Content>
  );
}
