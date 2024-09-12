import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import LoginButton from "./_components/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-sky-600">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md ",
            font.className
          )}
        >
          Auth 🔑
        </h1>
        <p className="text-white  text-lg">
          Practicing the New Authjs for Next
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" className="w-full">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
