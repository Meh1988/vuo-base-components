import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string;
  alt: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => (
  <div className={styles.avatar}>
    <img className={styles.avatar__image} src={src} alt={alt} />
  </div>
);
