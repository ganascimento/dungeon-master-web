/* eslint-disable react-hooks/exhaustive-deps */
import { Content } from "../../shared/components/Content";
import * as S from "./styles";
import { FaGripfire } from "react-icons/fa6";
import AttributesView from "./views/Attributes";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GameButton } from "../../shared/components/GameButton";
import LoaderContext from "../../shared/context/LoaderContext";
import { CharacterType, SkillType } from "../../@types/app.types";
import { CalcTotalLevelUp } from "../../shared/ultils/calcTotalPoints";
import { useNavigate } from "react-router-dom";
import SkillView from "./views/Skills";
import { Icon } from "@iconify/react";
import { SkillStore } from "../../shared/store/skill.store";
import AdventureContext from "../../shared/context/AdventureContext";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { AdventureStore } from "../../shared/store/adventure.store";
import { toast } from "react-toastify";

type CharCreationType = {
  icon: ReactNode;
  text: string;
  finished: (value: CharacterType) => boolean;
};

const charCreationData: CharCreationType[] = [
  {
    icon: <Icon icon="game-icons:skills" />,
    text: "Atributos",
    finished: (value: CharacterType) => CalcTotalLevelUp(value) === -1,
  },
  {
    icon: <FaGripfire />,
    text: "Habilidades",
    finished: (value: CharacterType) =>
      value.skills?.length === 6 + (value.level ?? 0),
  },
];

export default function CharUpLevelPage() {
  const [, setLoading] = useContext(LoaderContext);
  const [adventure, setAdventure] = useContext(AdventureContext);

  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState<SkillType[]>();
  const [character, setCharacter] = useState<CharacterType>();
  const [addSkills, setAddSkills] = useState<SkillType[]>([]);

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    if (!adventure) {
      navigate(ROUTER_PATHS.Home);
      return;
    }
    setCharacter(adventure?.characters?.find((c) => c.selected));
  }, []);

  const skillStore = new SkillStore();

  useEffect(() => {
    findSkills();
  }, []);

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
    if (!character) return <></>;

    switch (step) {
      case 0:
        return (
          <AttributesView character={character} setCharacter={setCharacter} />
        );
      case 1:
        return (
          <SkillView
            character={character}
            setCharacter={setCharacter}
            skills={skills}
            setAddSkills={setAddSkills}
          />
        );
    }
  };

  const handleBack = async () => {
    navigate(-1);
  };

  const handleSaveChar = async () => {
    setLoading(true);
    try {
      const selectedCharId = adventure?.characters?.find(
        (char) => char.selected
      )?.id;
      const result = await adventureStore.characterLevelUp({
        adventureId: adventure?.id!,
        skillsIds: addSkills?.map((skill) => skill.id) ?? [],
        id: character?.id!,
        constitution: character?.constitution!,
        dexterity: character?.dexterity!,
        intelligence: character?.intelligence!,
        strength: character?.strength!,
      });
      if (!result) throw new Error();
      setAdventure({
        ...result,
        characters: [...(result.characters ?? [])].map((char) => {
          if (char.id === selectedCharId) char.selected = true;
          return char;
        }),
      });
      toast.success("Sucesso!");
      handleBack();
    } catch {
      toast.error("Error!");
    } finally {
      setLoading(false);
    }
  };

  if (!character) return <></>;

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
        <S.ContentImage>
          <GameButton text="Voltar" onClick={handleBack} />
          {charCreationData.filter((x) => !x.finished(character)).length ===
          0 ? (
            <GameButton text="Salvar" onClick={handleSaveChar} />
          ) : (
            <></>
          )}
        </S.ContentImage>
      </S.Content>
    </Content>
  );
}
