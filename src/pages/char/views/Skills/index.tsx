import { CharacterType, SkillType } from "../../../../@types/app.types";
import * as S from "./styles";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import { useEffect, useState } from "react";

type Props = {
  skills?: SkillType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function SkillView(props: Props) {
  const [amount, setAmount] = useState(4);

  useEffect(() => {
    setAmount(4 - (props.character.skills?.length ?? 0));
  }, [props.character]);

  return (
    <>
      <S.Title>Selecione suas habilidades</S.Title>
      <S.Text>Selecione {amount}</S.Text>
      <S.Content>
        {props.skills?.map((skill, index) => (
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
