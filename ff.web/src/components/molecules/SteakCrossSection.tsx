import styles from './SteakCrossSection.module.scss';

interface SteakProps {
    placedSide: string;
    isPlaced: boolean;
    topDoneness: number;
    bottomDoneness: number;
    topSear: number;
    bottomSear: number;
}

function SteakCrossSection({
    placedSide,
    isPlaced,
    topDoneness,
    bottomDoneness,
    topSear,
    bottomSear
}: SteakProps) {
    return (
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
    );
}

export default SteakCrossSection; 