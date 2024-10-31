import { observer } from 'mobx-react-lite';
import { Card, Slider } from 'antd-mobile';
import Button from '@vuo/atoms/Button';
import React, { useEffect, useState } from 'react';
import Tooltip from '@vuo/atoms/ToolTip';
import styles from './VirtualSear.module.scss';

interface Doneness {
    min: number;
    max: number;
    name: string;
}

const donenessLevels: Doneness[] = [
    { min: 0, max: 39, name: 'Raw' },
    { min: 40, max: 49, name: 'Rare' },
    { min: 50, max: 59, name: 'Medium Rare' },
    { min: 60, max: 69, name: 'Medium' },
    { min: 70, max: 79, name: 'Medium Well' },
    { min: 80, max: 89, name: 'Well Done' },
    { min: 90, max: 99, name: 'Overcooked' },
    { min: 100, max: Infinity, name: 'Burnt' }
];

interface CookingMultiplier {
    searMultiplier: number;
    donenessMultiplier: number;
}

const getCookingMultiplier = (temperature: number): CookingMultiplier => {
    switch (temperature) {
        case 0: return { searMultiplier: 0, donenessMultiplier: 0 };
        case 1: return { searMultiplier: 1.5, donenessMultiplier: 1.4 };
        case 2: return { searMultiplier: 2.1, donenessMultiplier: 1.5 };
        case 3: return { searMultiplier: 3.15, donenessMultiplier: 1.6 };
        default: return { searMultiplier: 0, donenessMultiplier: 0 };
    }
};

const getTemperatureLabel = (temperature: number): string => {
    switch (temperature) {
        case 0: return 'Off';
        case 1: return 'Low';
        case 2: return 'Medium';
        case 3: return 'High';
        default: return 'Unknown';
    }
};

const baseSearRate = 2;
const baseDonenessRate = 1;

// Add the pan SVG component
function PanSvg() {
  return <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="100 100 300 300"
        className={styles.pan_svg}
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="matrix(0.936869, 0, 0, 0.936869, 16.497286, 17.708853)" />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" transform="matrix(0.936869, 0, 0, 0.936869, 16.497286, 17.708853)" />
        <g id="SVGRepo_iconCarrier" transform="matrix(0.936869, 0, 0, 0.936869, 16.497286, 17.708853)">
            <path style={{fill:"#3A3536"}} d="M321.3,222.2l40.5-54.3c0,0,54.3-30,44.6-53L346.2,161l-42.3,47.4L321.3,222.2z"/>
            <path style={{fill:"#514D4E"}} d="M280.9,198.8c0,0,43.2-39.6,55.2-49.7s40.4-30.8,48.8-35.9c12.9-7.8,27.1,0.5,19.8,6.9 c-7.4,6.4-32.2,21.6-46.5,36.3s-46,56.1-46,56.1L280.9,198.8z"/>
            <path style={{fill:"#C9C7C7"}} d="M280.9,198.8c0,0,3-2.8,7.7-7l29.2,13.6c-3.4,4.4-5.6,7.2-5.6,7.2L280.9,198.8z"/>
            <path style={{fill:"#ADACAC"}} d="M324.1,221.8l-6.4-16.4c-3.4,4.4-5.6,7.2-5.6,7.2S319.4,226,324.1,221.8z"/>
            <g>
                <path style={{fill:"#3A3536"}} d="M90.7,271.2c0-45.7,57.5-82.8,128.5-82.8s128.5,37.1,128.5,82.8S290.2,354,219.2,354 C148.2,354,90.7,316.9,90.7,271.2z"/>
                <path style={{fill:"#3A3536"}} d="M219.2,354c69.4,0,125.9-35.4,128.4-79.8c0-1.2,0-2,0-2.2c-3-44-59.3-41.3-128.3-41.3 c-68.6,0-124.6-3.1-128.3,40.5c0,0.3,0,1.6-0.1,3.6C93.8,318.9,150.1,354,219.2,354z"/>
            </g>
            <ellipse style={{fill:"#666465"}} cx="219.2" cy="300.6" rx="118.4" ry="73.5"/>
            <path style={{fill:"#B2162D"}} d="M219.2,354c-69.1,0-125.4-35.1-128.3-79.1c-0.1,10.1-0.1,20.9-0.1,22.1c0,45.7,57.5,89.2,128.5,89.2 s128.5-43.5,128.5-89.2c0-1.1,0-14.3-0.1-22.7C345.1,318.5,288.6,354,219.2,354z"/>
            <path style={{fill:"#E2E0E0"}} d="M219.2,356c-72,0-130.5-38.1-130.5-84.9s58.6-84.9,130.5-84.9c72,0,130.5,38.1,130.5,84.9 C349.7,318,291.2,356,219.2,356z M219.2,190.5c-69.7,0-126.4,36.2-126.4,80.7s56.7,80.7,126.4,80.7s126.4-36.2,126.4-80.7 S288.9,190.5,219.2,190.5z"/>
            <ellipse transform="matrix(0.8778 -0.479 0.479 0.8778 -9.2245 202.36)" style={{fill:"#3A3536"}} cx="392.036" cy="119.261" rx="7.8" ry="4.9"/>
        </g>
    </svg>
}

const VirtualSear: React.FC<{ onClose?: () => void; allowPlayAgain: boolean }> = observer(({ onClose, allowPlayAgain }) => {
    const [targetDoneness, setTargetDoneness] = useState<Doneness>(donenessLevels[Math.floor(Math.random() * donenessLevels.length)]);

    const [topSear, setTopSear] = useState<number>(0);
    const [bottomSear, setBottomSear] = useState<number>(0);
    const [topDoneness, setTopDoneness] = useState<number>(0);
    const [bottomDoneness, setBottomDoneness] = useState<number>(0);

    const [temperature, setTemperature] = useState<number>(0);

    const [isPlaced, setIsPlaced] = useState<boolean>(false);
    const [placedSide, setPlacedSide] = useState<string>("bottom");
    const [isServed, setIsServed] = useState<boolean>(false);

    function onPlaceOrRetire() {
        setIsPlaced(!isPlaced);
    }

    function onFlip() {
        setPlacedSide(placedSide === "bottom" ? "top" : "bottom");
    }

    function onServe() {
        setIsServed(true);
    }

    function onPlayAgain() {
        // Reset all values to default
        setTargetDoneness(donenessLevels[Math.floor(Math.random() * donenessLevels.length)]);
        setTopSear(0);
        setBottomSear(0);
        setTopDoneness(0);
        setBottomDoneness(0);
        setTemperature(0);
        setIsPlaced(false);
        setPlacedSide("bottom");
        setIsServed(false);
    }

    const getCurrentDoneness = (): Doneness => {
        const averageDoneness = (topDoneness + bottomDoneness) / 2;
        return donenessLevels.find(level => averageDoneness >= level.min && averageDoneness <= level.max) || donenessLevels[donenessLevels.length - 1];
    };

    const getResult = (): string => {
        const currentDoneness = getCurrentDoneness();
        if (currentDoneness.max > targetDoneness.max) {
            return "Overcooked for target doneness.";
        } if (currentDoneness.min < targetDoneness.min) {
            return "Undercooked for target doneness.";
        }
        return "Perfect for target doneness.";
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (isPlaced) {
            const interval = setInterval(() => {
                const { searMultiplier, donenessMultiplier } = getCookingMultiplier(temperature);

                if (placedSide === "bottom") {
                    setBottomSear(prev => Math.min(100, prev + (baseSearRate * searMultiplier) / 10));
                } else {
                    setTopSear(prev => Math.min(100, prev + (baseSearRate * searMultiplier) / 10));
                }

                // The insides cook together
                setTopDoneness(prev => Math.min(100, prev + (baseDonenessRate * donenessMultiplier) / 10));
                setBottomDoneness(prev => Math.min(100, prev + (baseDonenessRate * donenessMultiplier) / 10));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isPlaced, temperature, placedSide]);


    return (
        <Card className={styles.container}>
            {isServed ? (
                <>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Cooking Results</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.doneness_result_container}>
                            <p className={styles.result}>Target Doneness: {targetDoneness.name}</p>
                            <p className={styles.result}>Achieved Doneness: {getCurrentDoneness().name}</p>

                        </div>
                        <p className={styles.result}>
                            {getResult()}
                        </p>
                        <div className={styles.doneness_result_container}>
                            <p className={styles.result}>Top Sear: {Math.round(topSear)}%</p>
                            <p className={styles.result}>Bottom Sear: {Math.round(bottomSear)}%</p>
                            <p className={styles.result}>Inside Doneness: {Math.round((topDoneness + bottomDoneness) / 2)}%</p>
                        </div>
                    </div>
                    <div className={styles.controls_container}>
                        <div className={styles.button_container} style={{ flexDirection: 'column' }}>
                            {allowPlayAgain && (
                                <Button variant="large" color="primary" onClick={() => onPlayAgain()}>
                                    Play Again
                                </Button>
                            )}
                            <div style={{ height: '20px' }} />
                            {onClose && (
                                <Button variant="large" color="primary" onClick={() => onClose()}>
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.tooltip_container}>
                        <Tooltip
                            content={
                                <div>
                                    <p>Raw: 0-39%</p>
                                    <p>Rare: 40-49%</p>
                                    <p>Medium Rare: 50-59%</p>
                                    <p>Medium: 60-69%</p>
                                    <p>Medium Well: 70-79%</p>
                                    <p>Well Done: 80-89%</p>
                                    <p>Overcooked: 90-99%</p>
                                    <p>Burnt: 100%+</p>
                                </div>
                            }
                            
                        >
                            <span style={{ cursor: 'pointer' }}>&#8505;</span>
                        </Tooltip>
                    </div>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Virtual Sear</h1>
                    </div>
                    <div className={styles.subtitle}>
                        <span>
                            Target Doneness: {targetDoneness.name}
                        </span>
                    </div>
                    <div className={styles.content}>
                        <PanSvg />
                        <div className={`${styles.steak_container} ${placedSide !== 'bottom' ? styles.flipped : ''} ${isPlaced && styles.placed}`}>
                            
                            {/* Map over an array of two elements to create two halves of the steak */}
                            {[0, 1].map((index) => (
                                // Create a div for each half of the steak
                                <div key={index} className={styles.steak_half}>
                                    {/* This div represents the raw part of the steak */}
                                    <div className={styles.steak_half_raw} />
                                    {/* This div represents the cooked part of the steak */}
                                    <div
                                        className={styles.steak_half_cooked}
                                        style={{
                                            opacity: index === 0 ? topDoneness / 100 : bottomDoneness / 100
                                        }}
                                    />
                                    {/* This div represents the sear on the steak */}
                                    <div
                                        className={index === 0 ? styles.steak_half_sear_top : styles.steak_half_sear_bottom}
                                        style={{
                                            opacity: index === 0 ? topSear / 100 : bottomSear / 100
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.controls_container}>
                        <div className={styles.slider_container}>
                            <div className={styles.text}>Temperature: {getTemperatureLabel(temperature)}</div>
                            <Slider
                                step={1}
                                min={0}
                                max={3}
                                ticks
                                onChange={(value) => setTemperature(Number(value))}
                            />
                        </div>
                        <div style={{ height: '20px' }} />
                        <div className={styles.button_container}>
                            <Button variant="large" color="primary" onClick={() => onPlaceOrRetire()}>{isPlaced ? 'Retire' : 'Place'}</Button>
                            <Button variant="large" color="primary" onClick={() => onFlip()}>Flip</Button>
                        </div>
                    </div>
                    <div className={styles.info_container}>
                        <span className={styles.text}>Top Sear: {Math.round(topSear)}%</span>
                        <span className={styles.text}>Bottom Sear: {Math.round(bottomSear)}%</span>
                        <span className={styles.text}>Inside Doneness: {Math.round((topDoneness + bottomDoneness) / 2)}%</span>
                    </div>
                    <div className={styles.controls_container}>
                        <Button
                            variant="large"
                            color="primary"
                            onClick={() => onServe()}
                            disabled={isPlaced || (topSear === 0 && bottomSear === 0 && topDoneness === 0 && bottomDoneness === 0)}
                        >
                            Serve
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
});

export default VirtualSear;
