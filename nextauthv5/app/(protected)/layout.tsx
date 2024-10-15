import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const ProctedtLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-fuchsia-400">
      <Navbar />
      {children}
    </div>
  );
};

export default ProctedtLayout;
