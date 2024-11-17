export interface SkeletonLoaderProps {
  children?: React.ReactNode | React.ReactNode[];
  height?: string | number;
  isLoading?: boolean;
  variant?: "circular" | "rounded" | "text";
  width?: string | number;
  padding?: string | number;
  className?: string;
}
