/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Content } from "../../shared/components/Content";
import { Logo } from "../../shared/components/Logo";
import { MenuButton } from "../../shared/components/MenuButton";
import { AdventureStore } from "../../shared/store/adventure.store";
import { AdventureType } from "../../@types/app.types";
import SelectAdventureView from "./view/SelectAdventure";
import * as S from "./styles";
import CreatePersonView from "./view/CreatePerson";
import { logOff } from "../../shared/security/authentication";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { useNavigate } from "react-router-dom";
import InformationView from "./view/Information";
import { PauseMusic } from "../../shared/ultils/playMusics";
import OnlineRoomsView from "./view/Room";
import ConfigurationView from "./view/Configurations";
import StatisticsView from "./view/Statistics";
import PvPView from "./view/PvP";

export default function HomePage() {
  const [isOpenSelectCampain, setIsOpenSelectCampain] = useState(false);
  const [isOpenRoom, setIsOpenRoom] = useState(false);
  const [isOpenCreatePerson, setIsOpenCreatePerson] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenConfiguration, setIsOpenConfiguration] = useState(false);
  const [isOpenStatistics, setIsOpenStatistics] = useState(false);
  const [isOpenPvP, setIsOpenPvP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adventures, setAdventures] = useState<AdventureType[]>();

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  const handleOpenSelectCampain = () => {
    setIsOpenSelectCampain(true);
  };

  const handleOpenRoom = () => {
    setIsOpenRoom(true);
  };

  const handleIsOpenCreatePerson = () => {
    setIsOpenCreatePerson(true);
  };

  const handleIsOpenInfo = () => {
    setIsOpenInfo(true);
  };

  const handleIsOpenConfiguration = () => {
    setIsOpenConfiguration(true);
  };

  const handleIsOpenStatistics = () => {
    setIsOpenStatistics(true);
  };

  const handleIsOpenPvP = () => {
    setIsOpenPvP(true);
  };

  const handleExit = () => {
    logOff();
    navigate(ROUTER_PATHS.Login);
  };

  useEffect(() => {
    findData();
    PauseMusic();
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
        loading={loading}
        onClick={handleOpenSelectCampain}
      />
      <MenuButton text="Campanhas co-op" onClick={handleOpenRoom} />
      <MenuButton text="PvP" onClick={handleIsOpenPvP} />
      <MenuButton text="Personagens" onClick={handleIsOpenCreatePerson} />
      <MenuButton text="Estatísticas" onClick={handleIsOpenStatistics} />
      <MenuButton text="Configurações" onClick={handleIsOpenConfiguration} />
      <MenuButton text="Informações" onClick={handleIsOpenInfo} />
      <MenuButton text="Sair" onClick={handleExit} />

      <SelectAdventureView
        isOpen={isOpenSelectCampain}
        onClose={() => setIsOpenSelectCampain(false)}
        adventures={adventures}
        setAdventures={setAdventures}
      />
      <OnlineRoomsView
        isOpen={isOpenRoom}
        onClose={() => setIsOpenRoom(false)}
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
      <ConfigurationView
        isOpen={isOpenConfiguration}
        onClose={() => setIsOpenConfiguration(false)}
      />
      <StatisticsView
        isOpen={isOpenStatistics}
        onClose={() => setIsOpenStatistics(false)}
      />
      <PvPView isOpen={isOpenPvP} onClose={() => setIsOpenPvP(false)} />
    </Content>
  );
}
