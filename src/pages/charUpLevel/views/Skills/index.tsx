/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterType, SkillType } from "../../../../@types/app.types";
import * as S from "./styles";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import { useEffect, useState } from "react";
import { SkillEnum } from "../../../../@types/constants.types";

type Props = {
  skills?: SkillType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
  setAddSkills: (value: SkillType[]) => void;
};

export default function SkillView(props: Props) {
  const [amount, setAmount] = useState(1);
  const [initialValues, setInitialValues] = useState<SkillType[]>([]);

  useEffect(() => {
    setInitialValues(props.character.skills ?? []);
  }, []);

  useEffect(() => {
    setAmount(
      6 + (props.character.level ?? 0) - (props.character.skills?.length ?? 0)
    );
    const addSkills = props.character.skills?.filter(
      (skill) => !initialValues.map((x) => x.id).includes(skill.id)
    );

    props.setAddSkills(addSkills ?? []);
  }, [props.character]);

  const getSkillByType = (type: SkillEnum) => {
    return (
      props.skills?.filter(
        (x) =>
          x.type === type &&
          x.allowClasses?.includes(props.character.class?.type!) &&
          !initialValues.map((y) => y.id).includes(x.id)
      ) ?? []
    );
  };

  if (!initialValues || initialValues.length === 0) return <></>;

  return (
    <>
      <S.Title>Selecione suas habilidades</S.Title>
      <S.Text>Selecione {amount}</S.Text>

      {!!props.character.class ? (
        <>
          {getSkillByType(SkillEnum.Melee).length > 0 ? (
            <>
              <S.SkillType>Corpo a corpo</S.SkillType>
              <S.Content>
                {getSkillByType(SkillEnum.Melee)?.map((skill, index) => (
                  <SkillDetails
                    skill={skill}
                    key={index}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    canSelect={amount !== 0}
                  />
                ))}
              </S.Content>
            </>
          ) : (
            <></>
          )}

          {getSkillByType(SkillEnum.Range).length > 0 ? (
            <>
              <S.SkillType>Distância</S.SkillType>
              <S.Content>
                {getSkillByType(SkillEnum.Range)?.map((skill, index) => (
                  <SkillDetails
                    skill={skill}
                    key={index}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    canSelect={amount !== 0}
                  />
                ))}
              </S.Content>
            </>
          ) : (
            <></>
          )}

          {getSkillByType(SkillEnum.Health).length > 0 ? (
            <>
              <S.SkillType>Cura</S.SkillType>
              <S.Content>
                {getSkillByType(SkillEnum.Health).map((skill, index) => (
                  <SkillDetails
                    skill={skill}
                    key={index}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    canSelect={amount !== 0}
                  />
                ))}
              </S.Content>
            </>
          ) : (
            <></>
          )}

          {getSkillByType(SkillEnum.Mage).length > 0 ? (
            <>
              <S.SkillType>Magias</S.SkillType>
              <S.Content>
                {getSkillByType(SkillEnum.Mage).map((skill, index) => (
                  <SkillDetails
                    skill={skill}
                    key={index}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    canSelect={amount !== 0}
                  />
                ))}
              </S.Content>
            </>
          ) : (
            <></>
          )}

          {getSkillByType(SkillEnum.Passive).length > 0 ? (
            <>
              <S.SkillType>Passivas</S.SkillType>
              <S.Content>
                {getSkillByType(SkillEnum.Passive).map((skill, index) => (
                  <SkillDetails
                    skill={skill}
                    key={index}
                    character={props.character}
                    setCharacter={props.setCharacter}
                    canSelect={amount !== 0}
                  />
                ))}
              </S.Content>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
