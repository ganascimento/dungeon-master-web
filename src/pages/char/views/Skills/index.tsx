/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterType, SkillType } from "../../../../@types/app.types";
import * as S from "./styles";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import { useEffect, useState } from "react";
import {
  CharacterModeEnum,
  SkillEnum,
} from "../../../../@types/constants.types";
import Wrapper from "../../../../shared/components/Wrapper";
import { CHARACTER_PARAMS } from "../../../../shared/configurations/characterParams";

type Props = {
  skills?: SkillType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
  characterMode: CharacterModeEnum;
};

export default function SkillView(props: Props) {
  const [amount, setAmount] = useState(
    CHARACTER_PARAMS(props.characterMode).MaxSkills
  );

  useEffect(() => {
    setAmount(
      CHARACTER_PARAMS(props.characterMode).MaxSkills -
        (props.character.skills?.length ?? 0)
    );
  }, [props.character]);

  const melee = props.skills?.filter((x) => x.type === SkillEnum.Melee);
  const range = props.skills?.filter((x) => x.type === SkillEnum.Range);
  const health = props.skills?.filter((x) => x.type === SkillEnum.Health);
  const mage = props.skills?.filter((x) => x.type === SkillEnum.Mage);
  const passive = props.skills?.filter((x) => x.type === SkillEnum.Passive);

  const render = () => {
    if (!props.character.race) {
      return (
        <Wrapper width="100%" margin="10px 0">
          <S.Text>Escolha uma raça</S.Text>
        </Wrapper>
      );
    }
    if (!props.character.class) {
      return (
        <Wrapper width="100%" margin="10px 0">
          <S.Text>Escolha uma classe</S.Text>
        </Wrapper>
      );
    }

    return (
      <>
        {!!melee && melee.length > 0 ? (
          <>
            <S.SkillType>Corpo a corpo</S.SkillType>
            <S.Content>
              {melee?.map((skill, index) => (
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

        {!!range && range.length > 0 ? (
          <>
            <S.SkillType>Distância</S.SkillType>
            <S.Content>
              {props.skills
                ?.filter((x) => x.type === SkillEnum.Range)
                ?.map((skill, index) => (
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

        {!!health && health.length > 0 ? (
          <>
            <S.SkillType>Cura</S.SkillType>
            <S.Content>
              {props.skills
                ?.filter((x) => x.type === SkillEnum.Health)
                ?.map((skill, index) => (
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

        {!!mage && mage.length > 0 ? (
          <>
            <S.SkillType>Magias</S.SkillType>
            <S.Content>
              {props.skills
                ?.filter((x) => x.type === SkillEnum.Mage)
                ?.map((skill, index) => (
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

        {!!passive && passive.length > 0 ? (
          <>
            <S.SkillType>Passivas</S.SkillType>
            <S.Content>
              {props.skills
                ?.filter((x) => x.type === SkillEnum.Passive)
                ?.map((skill, index) => (
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
        <S.Text>Selecione {amount}</S.Text>
      </>
    );
  };

  return (
    <>
      <S.Title>Selecione suas habilidades</S.Title>

      {render()}
    </>
  );
}
