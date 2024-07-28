/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Content } from "../../shared/components/Content";
import { ClassList } from "../../shared/ultils/classList";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import CharacterContext from "../../shared/context/CharacterContext";
import { AbilityList } from "../../shared/components/AbilityList";
import { GameButton } from "../../shared/components/GameButton";
import AdventureContext from "../../shared/context/AdventureContext";
import { AdventureStore } from "../../shared/store/adventure.store";
import LoadingContext from "../../shared/context/LoaderContext";

export default function CharProfilePage() {
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [character] = useContext(CharacterContext);
  const [, setLoading] = useContext(LoadingContext);

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    if (!adventure || !character) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
  }, []);

  const getHeaderIcon = () => {
    return ClassList.find((x) => x.class === character?.classType);
  };

  const handleGoGame = async () => {
    if (!adventure?.started) {
      setLoading(true);

      try {
        const result = await adventureStore.start(adventure!);
        setAdventure(result);
      } finally {
        setLoading(false);
      }
    }

    navigate(ROUTER_PATHS.Game);
  };

  return (
    <Content>
      <S.Content>
        <S.ContentProfile>
          <div className="content-header">
            <div className="header-icon">{getHeaderIcon()?.icon}</div>
          </div>
          <S.Name>{character?.name}</S.Name>

          <AbilityList character={character} />
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
