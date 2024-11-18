// import Icon from '@vuo/atoms/Icon'
// import IconNames from '@vuo/models/IconTypes'

import CheckSvg from '@vuo/components/atoms/CheckSvg'
import BasketSvg from '@vuo/components/atoms/BasketSvg'
import style from './CheckListItem.module.scss'

interface CheckListItemProps {
  checked?: boolean;
  icon?: string;
  title?: string;
  subtitle: string;
  onValueChanged?: (value: boolean) => void;
}

function CheckListItem(props: CheckListItemProps) {

  const { checked, icon, title, onValueChanged, subtitle } = props

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onValueChanged?.(!checked);
    }
  };

  return (
    <div className={`${style.container} ${checked && style.container_checked}`}
      role='button'
      onClick={() => onValueChanged?.(!checked)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      
    >
      <div className={style.ingredient_container}>
        {icon && (
          <div className={`${style.icon_container}`}>
            {/* <Icon name={icon} size={24} /> */}
            <BasketSvg/>
          </div>
        )}
        <div className='mr8'>
          {title && (
            <div className={`${style.title} ${style.quantity_and_unit_bullet}`}>
              {title}
            </div>
          )}
          <div className={`${style.subtitle} flex`}>{subtitle}</div>
        </div>
      </div>
      <div className={`${style.check_container} ${checked ? style.checked : style.nonchecked} align-items-center flex justify-content-center`}>
        {/* <Icon color={checked ? "blue" : "white"} name={IconNames.Check} /> */}
        <CheckSvg color={checked ? "var(--surface-brand-blue)" : "white"} />
      </div>
    </div>
  )
}

export default CheckListItem