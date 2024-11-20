import { Space } from "antd-mobile";
// import Icon from "../atoms/Icon";
import styles from './InfoCard.module.scss'
import BasketSvg from "../atoms/BasketSvg";
import ForkAndKnifeSvg from "../atoms/ForAndKnifeSvg";

interface InfoCardItem {
  icon?: string;
  title: string;
}

interface InfoCardProps {
  title: string;
  items: InfoCardItem[];
}

function InfoCard(props: InfoCardProps) {
  const { title, items } = props

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <h3 className={styles.title}>{title}</h3>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <div className={styles.icon}>
              {item.icon &&
                item.icon === "ingredient" ? <BasketSvg />
              : <ForkAndKnifeSvg />
              // <Icon
              //   name={item.icon === "ingredient" ? "ingredient" : "chef-knife"}
              //   size="24"
              //   color={item.icon === "ingredient" ? "indigo-400" : "white"} 
              //   />
              }
            </div>
            <div className={`flex-one ${styles.text}`}>{item.title}</div>
          </div>
        ))}
      </Space>
    </div>
  );
}

export default InfoCard;
