/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Content } from "../../shared/components/Content";
import { Logo } from "../../shared/components/Logo";
import { MenuButton } from "../../shared/components/MenuButton";
import CreateAdventureView from "./view/CreateAdventure";
import { AdventureStore } from "../../shared/store/adventure.store";
import { AdventureType } from "../../@types/app.types";
import SelectAdventureView from "./view/SelectAdventure";
import * as S from "./styles";
import CreatePersonView from "./view/CreatePerson";
import { logOff } from "../../shared/security/authentication";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { useNavigate } from "react-router-dom";
import InformationView from "./view/Information";

export default function HomePage() {
  const [isOpenCreateCampain, setIsOpenCreateCampain] = useState(false);
  const [isOpenSelectCampain, setIsOpenSelectCampain] = useState(false);
  const [isOpenCreatePerson, setIsOpenCreatePerson] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adventures, setAdventures] = useState<AdventureType[]>();

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  const handleOpenCreateCampain = () => setIsOpenCreateCampain(true);

  const handleOpenSelectCampain = () => setIsOpenSelectCampain(true);

  const handleIsOpenCreatePerson = () => setIsOpenCreatePerson(true);

  const handleIsOpenInfo = () => setIsOpenInfo(true);

  const handleExit = () => {
    logOff();
    navigate(ROUTER_PATHS.Login);
  };

  useEffect(() => {
    findData();
  }, []);

  const findData = async () => {
    setLoading(true);
    try {
      const result = await adventureStore.getAll();
      setAdventures(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <S.Content>
        <Logo fontSize="25px" />
      </S.Content>
      <MenuButton
        text="Campanhas"
        disabled={!adventures || adventures.length === 0}
        loading={loading}
        onClick={handleOpenSelectCampain}
      />
      <MenuButton text="Criar Campanha" onClick={handleOpenCreateCampain} />
      <MenuButton text="Personagens" onClick={handleIsOpenCreatePerson} />
      <MenuButton text="Configurações" onClick={() => {}} disabled />
      <MenuButton text="Informações" onClick={handleIsOpenInfo} />
      <MenuButton text="Sair" onClick={handleExit} />

      <CreateAdventureView
        isOpen={isOpenCreateCampain}
        onClose={() => setIsOpenCreateCampain(false)}
        setAdventures={setAdventures}
      />
      <SelectAdventureView
        isOpen={isOpenSelectCampain}
        onClose={() => setIsOpenSelectCampain(false)}
        adventures={adventures}
      />
      <CreatePersonView
        isOpen={isOpenCreatePerson}
        onClose={() => setIsOpenCreatePerson(false)}
        setAdventures={setAdventures}
      />
      <InformationView
        isOpen={isOpenInfo}
        onClose={() => setIsOpenInfo(false)}
      />
    </Content>
  );
}
