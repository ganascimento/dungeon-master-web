import { useNavigate } from "react-router-dom";
import { AdventureType } from "../../../../@types/app.types";
import { Modal } from "../../../../shared/components/Modal";
import * as S from "./styles";
import { ROUTER_PATHS } from "../../../../shared/router/router.path";
import { useContext, useState } from "react";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { AdventureStore } from "../../../../shared/store/adventure.store";
import Wrapper from "../../../../shared/components/Wrapper";
import { MenuButton } from "../../../../shared/components/MenuButton";
import { PlayMusic } from "../../../../shared/ultils/playMusics";
import { PlayStartSong } from "../../../../shared/ultils/playSong";
import CreateAdventureView from "../CreateAdventure";
import { GetAdventureParse } from "../../../../shared/ultils/getAdventureParse";
import { Icon } from "@iconify/react";
import LoadingContext from "../../../../shared/context/LoadingContext";
import { toast } from "react-toastify";
import { MapDifficutyToString } from "../../../../shared/ultils/mapDifficutyToString";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  adventures?: AdventureType[];
  setAdventures: (value: AdventureType[] | undefined) => void;
};

export default function SelectAdventureView(props: Props) {
  const [, setLoading] = useContext(LoadingContext);
  const [, setAdventure] = useContext(AdventureContext);
  const [isOpenCreateCampain, setIsOpenCreateCampain] = useState(false);

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  const handleClick = async (adventure: AdventureType) => {
    const result = await adventureStore.getById(adventure!.id!);
    setAdventure(GetAdventureParse(result));
    navigate(ROUTER_PATHS.Game);
    PlayMusic();
    PlayStartSong();
  };

  const handleRemove = async (adventureId: string) => {
    setLoading(true);
    if (!adventureId) return;

    try {
      await adventureStore.delete(adventureId);
      const adventures = [...(props.adventures ?? [])].filter(
        (adventure) => adventure.id !== adventureId
      );
      props.setAdventures(adventures);
      toast.success("Removido com sucesso");
    } catch {
      toast.error("Falha ao remover");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Escolha qual aventura quer seguir"
      >
        <>
          {props.adventures && props.adventures.length > 0 ? (
            props.adventures?.map((adventure, index) => (
              <S.Flag onClick={() => handleClick(adventure)} key={index}>
                <div className="name">{adventure.name}</div>
                <div className="difficulty">
                  {MapDifficutyToString(adventure.difficultyLevel)}
                </div>
                <div className="remove">
                  <Icon
                    icon="iconamoon:trash-thin"
                    onClick={(e) => {
                      handleRemove(adventure.id!);
                      e.stopPropagation();
                    }}
                  />
                </div>
              </S.Flag>
            ))
          ) : (
            <>Nenhuma campanha encontrada</>
          )}

          <Wrapper
            justifyContent="end"
            alignItems="end"
            gap="10px"
            height="auto"
            margin="70px 0 0 0"
          >
            <MenuButton
              text="Fechar"
              marginBottom="0px"
              width={150}
              onClick={props.onClose}
            />
            <MenuButton
              text="Criar"
              marginBottom="0px"
              width={150}
              onClick={() => setIsOpenCreateCampain(true)}
            />
          </Wrapper>
        </>
      </Modal>
      <CreateAdventureView
        isOpen={isOpenCreateCampain}
        onClose={() => setIsOpenCreateCampain(false)}
        setAdventures={props.setAdventures}
      />
    </>
  );
}
