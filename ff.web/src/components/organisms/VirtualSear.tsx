import { observer } from 'mobx-react-lite';
import { Card, Slider } from 'antd-mobile';
import Button from '@vuo/atoms/Button';
import { PanSVG } from '@vuo/atoms/SVGComponents';
import React, { useEffect, useState } from 'react';
import Tooltip from '@vuo/atoms/ToolTip';
// import SteakCrossSection from '@vuo/molecules/SteakCrossSection';
import styles from './VirtualSear.module.scss';
import { SteakSVG } from '../atoms/SVGComponents';
import FlameSvg from '../atoms/FlameSvg';

interface Doneness {
    min: number;
    max: number;
    name: string;
}

const donenessLevels: Doneness[] = [
    { min: 0, max: 39.99, name: 'Raw' },
    { min: 40, max: 49.99, name: 'Rare' },
    { min: 50, max: 59.99, name: 'Medium Rare' },
    { min: 60, max: 69.99, name: 'Medium' },
    { min: 70, max: 79.99, name: 'Medium Well' },
    { min: 80, max: 89.99, name: 'Well Done' },
    { min: 90, max: 99.99, name: 'Overcooked' },
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

const VirtualSear: React.FC<{ onClose?: () => void; allowReplay: boolean; allowClose: boolean }> = observer(({ onClose, allowReplay, allowClose }) => {
    const [targetDoneness, setTargetDoneness] = useState<Doneness>(donenessLevels[Math.floor(Math.random() * donenessLevels.length)]);

    const [topSear, setTopSear] = useState<number>(0);
    const [bottomSear, setBottomSear] = useState<number>(0);
    const [topDoneness, setTopDoneness] = useState<number>(0);
    const [bottomDoneness, setBottomDoneness] = useState<number>(0);

    const [temperature, setTemperature] = useState<number>(0);

    const [isPlaced, setIsPlaced] = useState<boolean>(false);
    const [placedSide, setPlacedSide] = useState<string>("bottom");
    const [isServed, setIsServed] = useState<boolean>(false);

    const [currentFaceColor, setCurrentFaceColor] = useState<string>('hsl(354, 81%, 63%)');

    const useGetFaceColor = () => {
        const targetColor = `hsl(354, 81%, ${placedSide === 'bottom' ? 63 - topSear * 0.48 : 63 - bottomSear * 0.48}%)`;

        useEffect(() => {
            const timer = setTimeout(() => {
                setCurrentFaceColor(targetColor);
            }, 250);

            return () => clearTimeout(timer);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [placedSide]);

        return currentFaceColor;
    };

    const faceColor = useGetFaceColor();

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
        setCurrentFaceColor('hsl(354, 81%, 63%)');
    }

    const getCurrentDoneness = (): Doneness => {
        const rawAverageDoneness = (topDoneness + bottomDoneness) / 2;
        const averageDoneness = Math.round(rawAverageDoneness);

        if (averageDoneness > 100) {
            return donenessLevels[donenessLevels.length - 1];
        }

        const foundDoneness = donenessLevels.find(level =>
            averageDoneness >= level.min && averageDoneness <= level.max
        );

        if (!foundDoneness) {
            // eslint-disable-next-line no-console
            console.log('No doneness found for value:', averageDoneness);
        }

        return foundDoneness || donenessLevels[0];
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
                    setBottomSear(prev => prev + (baseSearRate * searMultiplier) / 10);
                } else {
                    setTopSear(prev => prev + (baseSearRate * searMultiplier) / 10);
                }

                // The insides cook together
                setTopDoneness(prev => prev + (baseDonenessRate * donenessMultiplier) / 10);
                setBottomDoneness(prev => prev + (baseDonenessRate * donenessMultiplier) / 10);
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
                            <p className={styles.result}>Top Sear: {Math.round(topSear) > 100 ? "Burnt" : `${Math.round(topSear)}%`}</p>
                            <p className={styles.result}>Bottom Sear: {Math.round(bottomSear) > 100 ? "Burnt" : `${Math.round(bottomSear)}%`}</p>
                            <p className={styles.result}>Inside Doneness: {getCurrentDoneness().name}</p>
                        </div>
                    </div>
                    <div className={styles.controls_container}>
                        <div className={styles.button_container} style={{ flexDirection: 'column' }}>
                            {allowReplay && (
                                <Button variant="large" color="primary" onClick={() => onPlayAgain()}>
                                    Play Again
                                </Button>
                            )}
                            <div style={{ height: '20px' }} />
                            {allowClose && onClose && (
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

                        <PanSVG className={styles.pan_svg} />


                        {/* <SteakCrossSection
                            placedSide={placedSide}
                            isPlaced={isPlaced}
                            topDoneness={topDoneness}
                            bottomDoneness={bottomDoneness}
                            topSear={topSear}
                            bottomSear={bottomSear}
                        /> */}
                        <SteakSVG
                            className={`${styles.steak_svg} ${isPlaced ? styles.placed : ''} ${placedSide !== 'bottom' ? styles.flipped : ''}`}
                            sideColor={`hsl(354, 67%, ${56 - ((topDoneness + bottomDoneness) / 2) * 0.48}%)`}
                            faceColor={faceColor}
                        />
                    </div>
                    <div className={styles.controls_container}>
                        <div className={styles.flame_container}>
                            {[...Array(temperature)].map(() => (
                                <FlameSvg className={styles.flame} />
                            ))}
                        </div>
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
                        <p className={styles.text}>Top Sear: {Math.round(topSear) > 100 ? "Burnt" : `${Math.round(topSear)}%`}</p>
                        <p className={styles.text}>Bottom Sear: {Math.round(bottomSear) > 100 ? "Burnt" : `${Math.round(bottomSear)}%`}</p>
                        <p className={styles.text}>Inside Doneness: {Math.round((topDoneness + bottomDoneness) / 2) > 100 ? "Burnt" : `${Math.round((topDoneness + bottomDoneness) / 2)}%`}</p>
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
