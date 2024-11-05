import React from "react";
import styles from "./Slider.module.scss";

interface SliderProps {
  defaultValue: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  defaultValue,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Slider;
