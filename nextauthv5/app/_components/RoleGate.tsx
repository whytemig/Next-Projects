"use client";
import { useCurrentRole } from "@/hooks/useRole";
import { UserRole } from "@prisma/client";
import React, { ReactNode } from "react";
import FormError from "./FormError";

interface RoleGateProps {
  children: ReactNode;
  allowRole: UserRole;
}

const RoleGate = ({ children, allowRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowRole) {
    return <FormError message="Permission Denied!" />;
  }
  return <>{children}</>;
};

export default RoleGate;
