import { CharacterType, SkillType } from "../../../../@types/app.types";
import * as S from "./styles";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import { useEffect, useState } from "react";
import { SkillEnum } from "../../../../@types/constants.types";

type Props = {
  skills?: SkillType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function SkillView(props: Props) {
  const [amount, setAmount] = useState(6);

  useEffect(() => {
    setAmount(6 - (props.character.skills?.length ?? 0));
  }, [props.character]);

  return (
    <>
      <S.Title>Selecione suas habilidades</S.Title>
      <S.Text>Selecione {amount}</S.Text>
      <S.SkillType>Corpo a corpo</S.SkillType>
      <S.Content>
        {props.skills
          ?.filter((x) => x.type === SkillEnum.Melee)
          .map((skill, index) => (
            <SkillDetails
              skill={skill}
              key={index}
              character={props.character}
              setCharacter={props.setCharacter}
              canSelect={amount !== 0}
            />
          ))}
      </S.Content>
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
  );
}
