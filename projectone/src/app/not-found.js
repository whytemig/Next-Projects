import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <h1>This page is Not Found.</h1>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
