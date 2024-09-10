import connectDB from "@/app/database/db";
import Blog from "@/app/models/models";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      return NextResponse.json({
        success: false,
        data: "No Blogs Found!",
      });
    }

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
