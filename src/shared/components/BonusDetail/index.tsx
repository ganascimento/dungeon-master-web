import React from "react";
import * as S from "./styles";
import { EffectType } from "../../../@types/app.types";
import { Icon } from "@iconify/react";
import { MapBonusColor, MapBonusIcons } from "../../ultils/mapBonusIcons";

type Props = {
  effects: EffectType[];
};

export const BonusDetail = (props: Props) => {
  return (
    <S.BonusContent>
      {props.effects?.map((effect, idx) => (
        <S.Bonus
          color={MapBonusColor(effect.type)}
          isUp={!!effect.value && effect.value > 0}
          key={idx}
        >
          <div className="icon">
            <Icon icon={MapBonusIcons(effect.type)} />
          </div>
          <div className="info">
            <div className="iconTurn">
              <Icon icon="mdi-light:clock" />
              <div className="turnValue">{effect.turns}</div>
            </div>
            <div className="value">
              <Icon
                icon={
                  !!effect.roll
                    ? "game-icons:dice-eight-faces-eight"
                    : !!effect.value && effect.value > 0
                    ? "fa6-solid:up-long"
                    : "fa6-solid:down-long"
                }
              />
              {effect.value ?? effect.roll}
            </div>
          </div>
        </S.Bonus>
      ))}
    </S.BonusContent>
  );
};
