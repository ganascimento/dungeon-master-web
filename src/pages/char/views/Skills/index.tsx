import { CharacterType, SkillType } from "../../../../@types/app.types";
import * as S from "./styles";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import { useEffect, useState } from "react";
import { SkillEnum } from "../../../../@types/constants.types";
import Wrapper from "../../../../shared/components/Wrapper";

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

  const melee = props.skills?.filter(
    (x) =>
      x.type === SkillEnum.Melee &&
      x.allowClasses?.includes(props.character.class?.type!)
  );
  const range = props.skills?.filter(
    (x) =>
      x.type === SkillEnum.Range &&
      x.allowClasses?.includes(props.character.class?.type!)
  );
  const health = props.skills?.filter(
    (x) =>
      x.type === SkillEnum.Health &&
      x.allowClasses?.includes(props.character.class?.type!)
  );
  const mage = props.skills?.filter(
    (x) =>
      x.type === SkillEnum.Mage &&
      x.allowClasses?.includes(props.character.class?.type!)
  );
  const passive = props.skills?.filter(
    (x) =>
      x.type === SkillEnum.Passive &&
      x.allowClasses?.includes(props.character.class?.type!)
  );

  return (
    <>
      <S.Title>Selecione suas habilidades</S.Title>

      {!!props.character.class ? (
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
                  ?.filter(
                    (x) =>
                      x.type === SkillEnum.Range &&
                      x.allowClasses?.includes(props.character.class?.type!)
                  )
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
                  ?.filter(
                    (x) =>
                      x.type === SkillEnum.Health &&
                      x.allowClasses?.includes(props.character.class?.type!)
                  )
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
                  ?.filter(
                    (x) =>
                      x.type === SkillEnum.Mage &&
                      x.allowClasses?.includes(props.character.class?.type!)
                  )
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
                  ?.filter(
                    (x) =>
                      x.type === SkillEnum.Passive &&
                      x.allowClasses?.includes(props.character.class?.type!)
                  )
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
      ) : (
        <Wrapper width="100%" margin="10px 0">
          <S.Text>Escolha uma classe</S.Text>
        </Wrapper>
      )}
    </>
  );
}
