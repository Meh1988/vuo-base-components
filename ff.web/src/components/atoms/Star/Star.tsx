interface StarProps {
  filled: boolean;
  onClick: () => void;
}

export const Star = ({ filled, onClick }: StarProps) => {
  return (
    <svg
      onClick={onClick}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "var(--adm-color-yellow)" : "var(--adm-color-light)"}
      style={{ cursor: "pointer" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l2.39 6.88h7.22l-5.75 4.17 2.39 6.88-5.75-4.17-5.75 4.17 2.39-6.88-5.75-4.17h7.22z" />
    </svg>
  );
};
