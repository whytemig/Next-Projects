"use server";

import { registerSchema } from "@/schemas";
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  const validateValues = registerSchema.safeParse(values);

  if (!validateValues.success) {
    return { error: "Invalid Input!" };
  }

  return { success: "Registered!" };
};
