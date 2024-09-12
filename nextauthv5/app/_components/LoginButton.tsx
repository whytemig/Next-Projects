"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  function handleOnClick() {
    router.push("/auth/login");
  }

  if (mode === "modal") {
    // Make modal pop up
    return <span>POP</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleOnClick}>
      {children}
    </span>
  );
}
