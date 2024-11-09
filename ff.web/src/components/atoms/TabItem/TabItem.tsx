import styles from "./TabItem.module.scss";

interface TabItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabItem = ({ label, isActive, onClick }: TabItemProps) => (
  <div
    className={`${styles.tabItem} ${isActive ? styles["tabItem--active"] : ""}`}
    onClick={onClick}
  >
    <p>{label}</p>
  </div>
);
