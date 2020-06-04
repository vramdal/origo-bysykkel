import React from 'react';
import './TabBar.scss';

interface TabBarProps {
  activeId: string;
  switchTab: (tabId: string) => void;
  tabs: Tabs;
}

export type Tabs = Map<string, React.ReactNode>;

export function TabBar<T>({ activeId, switchTab, tabs }: TabBarProps): JSX.Element {
  return (
    <div className={'tab-bar'}>
      {Array.from(tabs.keys()).map((tabId: string) => {
        return (
          <button
            role={'tab'}
            key={tabId}
            disabled={tabId === activeId}
            type={'button'}
            onClick={(): void => switchTab(tabId)}
          >
            {tabs.get(tabId)}
          </button>
        );
      })}
    </div>
  );
}
