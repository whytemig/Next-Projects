"use client";

// import { useCurrentUser } from "@/hooks/useCurrentFile";
import { signOut } from "next-auth/react";

const ProtectedSettings = () => {
  // const user = useCurrentUser();

  const OnClick = () => {
    signOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={OnClick}>
        Logout
      </button>
    </div>
  );
};

export default ProtectedSettings;
