"use client";

import logout from "@/actions/logout";
import { ReactNode } from "react";

interface LogoutProps {
  children?: ReactNode;
}

const LogoutButton = ({ children }: LogoutProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
