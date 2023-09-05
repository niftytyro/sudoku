import React from "react";

interface ButtonProps {
  type?: "primary" | "secondary";
  children?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "primary" ? "bg-lightYellow" : "bg-gray"
      } py-2 md:py-3 px-3 md:px-5 text-xs md:text-base border rounded-md flex items-center justify-center`}
    >
      {children}
    </button>
  );
};

export default Button;
