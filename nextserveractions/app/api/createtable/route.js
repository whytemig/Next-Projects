import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`CREATE TABLE Grudges (NAME varchar(255));`;
    return NextResponse.json({ data: result, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
