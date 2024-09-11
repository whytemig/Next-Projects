"use client";
import { useFormStatus } from "react-dom";

export default function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-indigo-500 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
