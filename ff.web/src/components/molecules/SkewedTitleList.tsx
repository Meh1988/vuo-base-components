import Space from '@vuo/atoms/Space'
import style from './SkewedTitleList.module.scss'

export interface SkewedTitle {
  backgroundColor?: string;
  foregroundColor?: string;
  title: string;
}

interface SkewedTitleListProps {
  items: SkewedTitle[];
  sequential: boolean;
}

function SkewedTitleList(props: SkewedTitleListProps) {
  const { items, sequential = false } = props

  return (
    <Space className={`${style.container}`} direction='vertical'>
      {items.map((item, index) => {
        const delay = sequential ? `${index * 0.3}s` : '0s';
        return (
          <div
            className={`
            ${item.title.length <= 11 ? `${style.title_short}` : `${style.title_long}`}
            ${index % 2 === 0 ? style.title_odd : style.title_even}
          `}
            key={`${item.title}_index`}
            style={{
              animationDelay: delay,
              backgroundColor: item.backgroundColor,
              color: item.foregroundColor
            }}
          >{item.title}</div>
        )
      })}
    </Space>
  );
};

export default SkewedTitleList;
