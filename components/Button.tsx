import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-lightYellow py-3 px-5 border rounded-md flex items-center justify-center">
      {children}
    </button>
  );
};

export default Button;
