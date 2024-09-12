"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButton {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButton) => {
  return (
    <Button className="font-normal w-full" variant="link" size="sm">
      <Link href={href}>{label}</Link>;
    </Button>
  );
};

export default BackButton;
