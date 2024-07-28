/* eslint-disable react-hooks/exhaustive-deps */
import { Content } from "../../shared/components/Content";
import * as S from "./styles";
import { GiDwarfFace } from "react-icons/gi";
import { MdOutlineHotelClass } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import AbilitiesView from "./views/Abilities";
import { ReactNode, useContext, useEffect, useState } from "react";
import RaceView from "./views/Races";
import ClassView from "./views/Classes";
import { GameButton } from "../../shared/components/GameButton";
import { ClassStore } from "../../shared/store/class.store";
import { RaceStore } from "../../shared/store/race.store";
import LoadingContext from "../../shared/context/LoaderContext";
import { CharacterType, ClassType, RaceType } from "../../@types/app.types";
import { CalcTotalPoints } from "../../shared/ultils/calcTotalPoints";
import { BsInfoLg } from "react-icons/bs";
import InfoView from "./views/Info";
import { AdventureStore } from "../../shared/store/adventure.store";
import AdventureContext from "../../shared/context/AdventureContext";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import CharacterContext from "../../shared/context/CharacterContext";

type CharCreationType = {
  icon: ReactNode;
  text: string;
  finished: (value: CharacterType) => boolean;
};

const charCreationData: CharCreationType[] = [
  {
    icon: <GiDwarfFace />,
    text: "Raça",
    finished: (value: CharacterType) => !!value.raceType,
  },
  {
    icon: <MdOutlineHotelClass />,
    text: "Classe",
    finished: (value: CharacterType) => !!value.classType,
  },
  {
    icon: <FaGripfire />,
    text: "Habilidades",
    finished: (value: CharacterType) => CalcTotalPoints(value) === 0,
  },
  {
    icon: <BsInfoLg />,
    text: "Informações",
    finished: (value: CharacterType) =>
      !!value.name &&
      value.name.length > 4 &&
      !!value.description &&
      value.description.length > 12,
  },
];

const initialValue: CharacterType = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

export default function CharPage() {
  const [, setLoading] = useContext(LoadingContext);
  const [adventure, setAdventure] = useContext(AdventureContext);
  const [, setCharacterCtx] = useContext(CharacterContext);

  const [step, setStep] = useState(0);
  const [races, setRaces] = useState<RaceType[]>();
  const [classes, setClasses] = useState<ClassType[]>();
  const [character, setCharacter] = useState<CharacterType>(initialValue);

  const navigate = useNavigate();

  const classStore = new ClassStore();
  const raceStore = new RaceStore();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
    findClasses();
    findRaces();
  }, []);

  const findClasses = async () => {
    setLoading(true);

    try {
      const result = await classStore.getAll();
      setClasses(result);
    } finally {
      setLoading(false);
    }
  };

  const findRaces = async () => {
    setLoading(true);

    try {
      const result = await raceStore.getAll();
      setRaces(result);
    } finally {
      setLoading(false);
    }
  };

  const getIconFromStep = () => {
    switch (step) {
      case 0:
        return <GiDwarfFace />;
      case 1:
        return <MdOutlineHotelClass />;
      case 2:
        return <FaGripfire />;
      case 3:
        return <BsInfoLg />;
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <RaceView
            races={races}
            character={character}
            setCharacter={setCharacter}
          />
        );
      case 1:
        return (
          <ClassView
            classes={classes}
            character={character}
            setCharacter={setCharacter}
          />
        );
      case 2:
        return (
          <AbilitiesView character={character} setCharacter={setCharacter} />
        );
      case 3:
        return <InfoView character={character} setCharacter={setCharacter} />;
    }
  };

  const handleSaveChar = async () => {
    setLoading(true);

    try {
      await adventureStore.saveCharacter(adventure!.id!, character);
      const result = await adventureStore.getById(adventure!.id!);
      setAdventure(result);
      setCharacterCtx(result?.characteres![0]);
      navigate(ROUTER_PATHS.CharProfile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <S.Content>
        <S.ContentPrincipal>
          <div className="margin"></div>
          {charCreationData.map((data, index) => (
            <div
              className={`content ${step === index ? "selected" : ""}`}
              onClick={() => setStep(index)}
              key={index}
            >
              <div
                className={`${
                  data.finished(character) ? "indicator-success" : "indicator"
                }`}
              >
                {data.icon}
              </div>{" "}
              {data.text}
            </div>
          ))}
        </S.ContentPrincipal>
        <S.ContentSecond>
          <div className="content-header">
            <div className="header-icon">{getIconFromStep()}</div>
          </div>
          {renderSteps()}
        </S.ContentSecond>
        {charCreationData.filter((x) => !x.finished(character)).length === 0 ? (
          <S.ContentImage>
            <GameButton text="Criar personagem" onClick={handleSaveChar} />
          </S.ContentImage>
        ) : (
          <></>
        )}
      </S.Content>
    </Content>
  );
}
