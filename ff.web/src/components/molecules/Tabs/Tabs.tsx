// Tabs.js
import Section from "@vuo/components/atoms/Section";
import { AnimatePresence, motion } from "framer-motion";
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

  const tabAnimation = {
    enter: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={styles.tabs}>
      <Section>
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
      </Section>
      <AnimatePresence mode="wait">
        {tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                className={styles.tabContent}
                initial="enter"
                animate="center"
                exit="exit"
                variants={tabAnimation}
              >
                {tab.content}
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};
