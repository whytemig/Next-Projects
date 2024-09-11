"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addGrudge(formData) {
  const name = formData.get("name");

  if (!name) {
    throw new Error("No Input");
    return;
  }
  try {
    await sql`INSERT INTO Grudges (Name) VALUES (${name})`;
    revalidatePath("/");
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
