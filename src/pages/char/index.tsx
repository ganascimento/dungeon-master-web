/* eslint-disable react-hooks/exhaustive-deps */
import { Content } from "../../shared/components/Content";
import * as S from "./styles";
import { MdOutlineHotelClass } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import AttributesView from "./views/Attributes";
import { ReactNode, useContext, useEffect, useState } from "react";
import RaceView from "./views/Races";
import ClassView from "./views/Classes";
import { GameButton } from "../../shared/components/GameButton";
import { ClassStore } from "../../shared/store/class.store";
import { RaceStore } from "../../shared/store/race.store";
import LoadingContext from "../../shared/context/LoaderContext";
import {
  CharacterType,
  ClassType,
  RaceType,
  SkillType,
} from "../../@types/app.types";
import { CalcTotalPoints } from "../../shared/ultils/calcTotalPoints";
import { BsInfoLg } from "react-icons/bs";
import InfoView from "./views/Info";
import { AdventureStore } from "../../shared/store/adventure.store";
import AdventureContext from "../../shared/context/AdventureContext";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import SkillView from "./views/Skills";
import { Icon } from "@iconify/react";
import { SkillStore } from "../../shared/store/skill.store";

type CharCreationType = {
  icon: ReactNode;
  text: string;
  finished: (value: CharacterType) => boolean;
};

const charCreationData: CharCreationType[] = [
  {
    icon: <Icon icon="game-icons:dwarf-helmet" />,
    text: "Raça",
    finished: (value: CharacterType) => !!value.race?.id,
  },
  {
    icon: <MdOutlineHotelClass />,
    text: "Classe",
    finished: (value: CharacterType) => !!value.class?.id,
  },
  {
    icon: <Icon icon="game-icons:skills" />,
    text: "Atributos",
    finished: (value: CharacterType) => CalcTotalPoints(value) === 0,
  },
  {
    icon: <FaGripfire />,
    text: "Habilidades",
    finished: (value: CharacterType) => value.skills?.length === 4,
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

  const [step, setStep] = useState(0);
  const [races, setRaces] = useState<RaceType[]>();
  const [classes, setClasses] = useState<ClassType[]>();
  const [skills, setSkills] = useState<SkillType[]>();
  const [character, setCharacter] = useState<CharacterType>(initialValue);

  const navigate = useNavigate();

  const classStore = new ClassStore();
  const raceStore = new RaceStore();
  const skillStore = new SkillStore();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
    findClasses();
    findRaces();
    findSkills();
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

  const findSkills = async () => {
    setLoading(true);
    try {
      const result = await skillStore.getAll();
      setSkills(result);
    } finally {
      setLoading(false);
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
          <AttributesView character={character} setCharacter={setCharacter} />
        );
      case 3:
        return (
          <SkillView
            character={character}
            setCharacter={setCharacter}
            skills={skills}
          />
        );
      case 4:
        return <InfoView character={character} setCharacter={setCharacter} />;
    }
  };

  const handleSaveChar = async () => {
    setLoading(true);

    try {
      await adventureStore.saveCharacter(adventure!.id!, character);
      const result = await adventureStore.getById(adventure!.id!);
      setAdventure(result);
      navigate(ROUTER_PATHS.CharProfile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content type={2}>
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
            <div className="header-icon">{charCreationData[step].icon}</div>
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
