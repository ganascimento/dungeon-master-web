/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Content } from "../../shared/components/Content";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { AbilityList } from "../../shared/components/AbilityList";
import { GameButton } from "../../shared/components/GameButton";
import AdventureContext from "../../shared/context/AdventureContext";
import { AdventureStore } from "../../shared/store/adventure.store";
import LoadingContext from "../../shared/context/LoaderContext";
import { Icon } from "@iconify/react";
import { SkillDetails } from "../../shared/components/SkillDetails";

export default function CharProfilePage() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [, setLoading] = useContext(LoadingContext);

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
  }, []);

  const handleGoGame = async () => {
    if (!adventure?.started) {
      setLoading(true);

      try {
        await adventureStore.start(adventure!);
        const result = await adventureStore.getById(adventure!.id!);
        setAdventure(result);
      } finally {
        setLoading(false);
      }
    }

    navigate(ROUTER_PATHS.Game);
  };

  return (
    <Content type={2}>
      <S.Content>
        <S.ContentProfile>
          <div className="content-header">
            <div className="header-icon">
              {<Icon icon={adventure?.character?.class?.icon ?? ""} />}
            </div>
          </div>
          <S.Name>{adventure?.character?.name}</S.Name>
          <S.Race>{adventure?.character?.race?.name}</S.Race>

          <AbilityList character={adventure?.character} />

          <S.ContentSkills>
            {adventure?.character?.skills?.map((skill, index) => (
              <SkillDetails
                skill={skill}
                character={adventure!.character!}
                key={index}
              />
            ))}
          </S.ContentSkills>
        </S.ContentProfile>
        <S.ContentImage>
          <GameButton
            text={adventure?.started ? "Jogar" : "Começar"}
            onClick={handleGoGame}
          />
        </S.ContentImage>
      </S.Content>
    </Content>
  );
}
