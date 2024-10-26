// Tabs.js
import { useState } from "react";
import { TabItem } from "../../atoms/TabItem";
import styles from "./Tabs.module.scss";

interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode | React.ReactNode[];
    disabled?: boolean;
  }[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__tabButtons}>
        {tabs.map((tab) => {
          const showContent = tab.id === activeTab;

          return (
            <TabItem
              key={tab.id}
              label={tab.label}
              isActive={showContent}
              onClick={() => handleTabClick(tab.id)}
            />
          );
        })}
      </div>

      <div className={styles.tabContent}>
        {tabs.map((tab) => (tab.id === activeTab ? tab.content : null))}
      </div>
    </div>
  );
};
