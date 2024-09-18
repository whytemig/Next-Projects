import React from "react";
import Header from "@/app/_components/Header";
import BackButton from "./BackButton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Something went Wrong!"></Header>
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to Login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
