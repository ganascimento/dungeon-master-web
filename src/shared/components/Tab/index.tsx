import React, { ReactNode, useState } from "react";
import * as S from "./styles";

export type TabConfigType = {
  key: string;
  name: string;
  component: ReactNode;
};

type Props = {
  tabs: TabConfigType[];
};

export const Tab = (props: Props) => {
  const [tabsState, setTabsState] = useState(
    props.tabs.map((tab, index) => ({
      key: tab.key,
      active: index === 0,
    }))
  );

  const handleClickTab = (tab: TabConfigType) => {
    setTabsState(
      [...tabsState].map((state) => {
        if (state.key === tab.key) state.active = true;
        else state.active = false;
        return state;
      })
    );
  };

  const getActiveComponent = () => {
    const activeKey = tabsState.find((state) => state.active)?.key!;
    return props.tabs.find((tab) => tab.key === activeKey)!.component;
  };

  if (props.tabs.length === 0) return <></>;

  return (
    <>
      <S.Content>
        <S.ContentTabs>
          {props.tabs.map((tab, index) => (
            <S.Tab
              key={index}
              active={tabsState.find((x) => x.key === tab.key)?.active ?? false}
              onClick={() => handleClickTab(tab)}
            >
              {tab.name}
            </S.Tab>
          ))}
        </S.ContentTabs>
        <S.Body>{getActiveComponent()}</S.Body>
      </S.Content>
    </>
  );
};
