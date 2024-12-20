/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "../../../../shared/components/Modal";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import { Tab, TabConfigType } from "../../../../shared/components/Tab";
import * as S from "./styles";
import { MapDifficutyToString } from "../../../../shared/ultils/mapDifficutyToString";
import { StatisticStore } from "../../../../shared/store/statistic.store";
import { useEffect, useState } from "react";
import {
  StatisticCharacterType,
  StatisticBattleType,
  StatisticPvPType,
} from "../../../../@types/app.types";
import { Icon } from "@iconify/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function StatisticsView(props: Props) {
  const [difficutyData, setDifficutyData] = useState<StatisticBattleType[]>([]);
  const [pvpData, setPvPData] = useState<StatisticPvPType[]>([]);
  const [raceData, setRaceData] = useState<StatisticCharacterType[]>([]);
  const [classData, setClassData] = useState<StatisticCharacterType[]>([]);
  const [loading, setLoading] = useState(false);

  const statisticStore = new StatisticStore();

  useEffect(() => {
    if (props.isOpen) getData();
  }, [props.isOpen]);

  const getData = async () => {
    setLoading(true);
    try {
      const mDifficutyData = await statisticStore.getDifficuty();
      const mPvpData = await statisticStore.getPvP();
      const mRaceData = await statisticStore.getRace();
      const mClassData = await statisticStore.getClass();

      setDifficutyData(mDifficutyData);
      setPvPData(mPvpData);
      setRaceData(mRaceData);
      setClassData(mClassData);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    props.onClose();
  };

  const difficutyComponent = () => {
    const getPlayer = (difficutyType: number) =>
      difficutyData.find(
        (x) => x.type === 1 && x.difficultyLevel === difficutyType
      );
    const getGlobal = (difficutyType: number) =>
      difficutyData.find(
        (x) => x.type === 2 && x.difficultyLevel === difficutyType
      );

    return (
      <>
        <Wrapper width="100%" alignItems="start">
          <Wrapper
            width="30%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            margin="70px 0 0 0"
          >
            <S.TextIdent>{MapDifficutyToString(1)}</S.TextIdent>
            <S.TextIdent>{MapDifficutyToString(2)}</S.TextIdent>
            <S.TextIdent>{MapDifficutyToString(3)}</S.TextIdent>
            <S.TextIdent>{MapDifficutyToString(4)}</S.TextIdent>
            <S.TextIdent>{MapDifficutyToString(5)}</S.TextIdent>
          </Wrapper>
          <Wrapper width="70%" alignItems="start">
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Pessoal</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 3px 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {[1, 2, 3, 4, 5].map((difficutyType) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={difficutyType}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>
                      {getPlayer(difficutyType)?.totalVictory ?? "-"}
                    </S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>
                      {getPlayer(difficutyType)?.totalDefeat ?? "-"}
                    </S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Global</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 0 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {[1, 2, 3, 4, 5].map((difficutyType) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={difficutyType}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>
                      {getGlobal(difficutyType)?.totalVictory ?? "-"}
                    </S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>
                      {getGlobal(difficutyType)?.totalDefeat ?? "-"}
                    </S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };

  const pvpComponent = () => {
    return (
      <>
        <Wrapper width="100%" alignItems="start">
          <Wrapper
            width="30%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            margin="70px 0 0 0"
          >
            {pvpData.map((pvpItem, index) => (
              <S.TextIdent key={index}>{pvpItem.userName}</S.TextIdent>
            ))}
          </Wrapper>
          <Wrapper width="70%" alignItems="start">
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Rank Global</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 3px 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {pvpData.map((pvpItem, index) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={index}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{pvpItem?.totalVictory ?? "-"}</S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{pvpItem?.totalDefeat ?? "-"}</S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };

  const raceComponent = () => {
    const getPlayer = () => raceData.filter((x) => x.type === 1);
    const getGlobal = () => raceData.filter((x) => x.type === 2);
    const getIdents = () =>
      raceData.filter((x) => x.type === 1).map((x) => x.ident);

    return (
      <>
        <Wrapper width="100%" alignItems="start">
          <Wrapper
            width="30%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            margin="70px 0 0 0"
          >
            {getIdents().map((ident) => (
              <S.TextIcon>{<Icon icon={ident} />}</S.TextIcon>
            ))}
          </Wrapper>
          <Wrapper width="70%" alignItems="start">
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Pessoal</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 3px 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {getPlayer().map((raceItem, index) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={index}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{raceItem?.totalVictory ?? "-"}</S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{raceItem?.totalDefeat ?? "-"}</S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Global</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 0 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {getGlobal().map((raceItem, index) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={index}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{raceItem?.totalVictory ?? "-"}</S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{raceItem?.totalDefeat ?? "-"}</S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };

  const classComponent = () => {
    const getPlayer = () => classData.filter((x) => x.type === 1);
    const getGlobal = () => classData.filter((x) => x.type === 2);
    const getIdents = () =>
      classData.filter((x) => x.type === 1).map((x) => x.ident);

    return (
      <>
        <Wrapper width="100%" alignItems="start">
          <Wrapper
            width="30%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            margin="70px 0 0 0"
          >
            {getIdents().map((ident) => (
              <S.TextIcon>{<Icon icon={ident} />}</S.TextIcon>
            ))}
          </Wrapper>
          <Wrapper width="70%" alignItems="start">
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Pessoal</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 3px 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {getPlayer().map((classItem, index) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={index}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{classItem?.totalVictory ?? "-"}</S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{classItem?.totalDefeat ?? "-"}</S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
            <Wrapper
              width="50%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper>
                <S.TextMain>Global</S.TextMain>
              </Wrapper>
              <Wrapper width="100%" margin="7px 0 0 0">
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#28a745">Vitórias</S.TextSecondary>
                </Wrapper>
                <Wrapper width="50%" justifyContent="center">
                  <S.TextSecondary color="#dc3545">Derrotas</S.TextSecondary>
                </Wrapper>
              </Wrapper>

              {getGlobal().map((classItem, index) => (
                <Wrapper width="100%" margin="7px 0 0 0" key={index}>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{classItem?.totalVictory ?? "-"}</S.TextValue>
                  </Wrapper>
                  <Wrapper width="50%" justifyContent="center">
                    <S.TextValue>{classItem?.totalDefeat ?? "-"}</S.TextValue>
                  </Wrapper>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </>
    );
  };

  const tabsConfig: TabConfigType[] = [
    {
      key: "difficuty",
      name: "Dificuldade",
      component: difficutyComponent(),
    },
    {
      key: "race",
      name: "Race",
      component: raceComponent(),
    },
    {
      key: "class",
      name: "Classe",
      component: classComponent(),
    },
    {
      key: "pvp",
      name: "PVP",
      component: pvpComponent(),
    },
  ];

  return (
    <Modal isOpen={props.isOpen} onClose={close} title="Estatísticas">
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Tab tabs={tabsConfig} />
        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          margin="70px 0 0 0"
        >
          <MenuButton
            text="Fechar"
            marginBottom="0px"
            width={150}
            onClick={close}
            loading={loading}
            disabled={loading}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
