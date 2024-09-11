"use client";
import React, { useRef } from "react";
import SubmitForm from "./SubmitForm";
import { addGrudge } from "@/app/actions/creategrdudge";

export default function InputRest() {
  const formRef = useRef(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addGrudge(formData);
        formRef.current?.reset();
      }}
      className="space-y-4"
    >
      <label
        htmlFor="Gname"
        className="block text-lg font-bold text-center text-slate-900"
      >
        Name of Grudge
      </label>
      <input
        type="text"
        id="Gname"
        placeholder="Type in a Grudge"
        name="name"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
      />
      <SubmitForm />
    </form>
  );
}
