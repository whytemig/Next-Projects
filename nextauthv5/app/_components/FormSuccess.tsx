import React from "react";
import { FormErrorMessage } from "./FormError";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const FormSuccess = ({ message }: FormErrorMessage) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-700">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
