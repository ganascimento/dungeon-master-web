import { useEffect, useState } from "react";
import { Content } from "../../shared/components/Content";
import { Logo } from "../../shared/components/Logo";
import { MenuButton } from "../../shared/components/MenuButton";
import "./styles.css";
import CreateAdventureView from "./view/CreateAdventure";
import { AdventureStore } from "../../shared/store/adventure.store";
import { AdventureType } from "../../@types/app.types";
import SelectAdventureView from "./view/SelectAdventure";

export default function AdventurePage() {
  const [isOpenCreateCampain, setIsOpenCreateCampain] = useState(false);
  const [isOpenSelectCampain, setIsOpenSelectCampain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adventures, setAdventures] = useState<AdventureType[]>();

  const adventureStore = new AdventureStore();

  const handleOpenCreateCampain = () => setIsOpenCreateCampain(true);

  const handleOpenSelectCampain = () => setIsOpenSelectCampain(true);

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
      <div className="content-logo">
        <Logo fontSize="25px" />
      </div>
      <MenuButton
        text="Campanhas"
        disabled={!adventures || adventures.length === 0}
        loading={loading}
        onClick={handleOpenSelectCampain}
      />
      <MenuButton text="Criar Campanha" onClick={handleOpenCreateCampain} />

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
    </Content>
  );
}
