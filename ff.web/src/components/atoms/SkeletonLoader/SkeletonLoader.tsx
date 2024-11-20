import { SkeletonLoaderProps } from "./SkeletonLoader.interface";
import styles from "./SkeletonLoader.module.scss";

export const SkeletonLoader = ({
  children,
  height,
  isLoading = true,
  variant = "rounded",
  width = "100%",
  padding,
  className,
}: SkeletonLoaderProps) =>
  isLoading ? (
    <div
      className={`${
        isLoading
          ? `${styles.skeletonLoader} ${styles[`skeletonLoader--${variant}`]} ${className}`
          : ""
      } `}
      style={{
        width: isLoading ? width : "",
        height: isLoading ? height : "",
        padding: isLoading ? padding : "",
        boxSizing: "border-box",
      }}
    />
  ) : (
    children
  );
