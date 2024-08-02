import { useContext } from "react";
import * as S from "./styles";
import { Icon } from "@iconify/react";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import AdventureContext from "../../../../shared/context/AdventureContext";

export default function CharBarView() {
  const [adventure] = useContext(AdventureContext);

  const calcLifePerc = () =>
    adventure?.character?.currentLife !== 0
      ? Math.floor(
          (adventure?.character?.currentLife! * 100) /
            adventure?.character?.totalLife!
        )
      : 0;

  return (
    <S.Content>
      <S.Avatar lifePerc={calcLifePerc()}>
        <div className="sub">
          <Icon icon={adventure?.character?.class?.icon ?? ""} />
        </div>
      </S.Avatar>
      <S.ActionBar>
        {adventure?.character?.skills?.map((skill, index) => (
          <SkillDetails
            skill={skill}
            character={adventure?.character!}
            key={index}
            iconPosition="left"
          />
        ))}
      </S.ActionBar>
      <S.EndTurnBtn>Finalizar Turno</S.EndTurnBtn>
    </S.Content>
  );
}
