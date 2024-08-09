import { useContext } from "react";
import * as S from "./styles";
import { Icon } from "@iconify/react";
import { SkillDetails } from "../../../../shared/components/SkillDetails";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { BoardStore } from "../../../../shared/store/board.Store";
import LoadingContext from "../../../../shared/context/LoadingContext";

export default function CharBarView() {
  const [loading, setLoading] = useContext(LoadingContext);
  const [adventure, setAdventure] = useContext(AdventureContext);

  const calcLifePerc = () =>
    adventure?.character?.currentLife !== 0
      ? Math.floor(
          (adventure?.character?.currentLife! * 50) /
            adventure?.character?.totalLife!
        )
      : 0;

  const calcStaminaPerc = () =>
    adventure?.character?.currentStamina !== 0
      ? Math.floor(
          ((adventure?.character?.totalStamina! -
            adventure?.character?.currentStamina!) *
            50) /
            adventure?.character?.totalStamina!
        )
      : 50;

  const endTurn = () => {
    setLoading(true);
    new BoardStore()
      .characterEndTurn(adventure!.id!)
      .then((e) => {
        if (!!e) setAdventure(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <S.Content>
      <S.Avatar lifePerc={calcLifePerc()} staminaPerc={calcStaminaPerc()}>
        <div className="sub">
          <div className="attr">
            <div>{adventure?.character?.currentLife}</div>
            <div>{adventure?.character?.totalLife}</div>
          </div>
          <Icon icon={adventure?.character?.class?.icon ?? ""} />
          <div className="attr">
            <div>{adventure?.character?.currentStamina}</div>
            <div>{adventure?.character?.totalStamina}</div>
          </div>
        </div>
      </S.Avatar>
      <S.ActionBar>
        {adventure?.character?.skills?.map((skill, index) => (
          <SkillDetails
            skill={skill}
            character={adventure?.character!}
            isSelected={true}
            setCharacter={(e) => setAdventure({ ...adventure, character: e })}
            key={index}
            iconPosition="left"
            disable={
              (adventure.character?.currentStamina ?? 0) < skill.staminaCost
            }
          />
        ))}
      </S.ActionBar>
      <S.Itens>
        <div className="item">
          <Icon icon="grommet-icons:script" />
          <div className="popup">
            <div className="main">Missão principal</div>
            <div className="text">{adventure?.mainGoal}</div>
            <div className="second">Secundárias</div>
            <div className="text">{adventure?.currentGoal}</div>
          </div>
        </div>
        <div className="item">
          <Icon icon="ph:treasure-chest" />
        </div>
      </S.Itens>
      <S.EndTurnBtn
        disabled={(!adventure?.location?.battle?.running ?? false) || loading}
        onClick={
          adventure?.location?.battle?.running && !loading ? endTurn : undefined
        }
      >
        Finalizar Turno
      </S.EndTurnBtn>
    </S.Content>
  );
}
