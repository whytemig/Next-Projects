import connectDB from "@/app/database/db";
import Blog from "@/app/models/models";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request) {
  try {
    await connectDB();

    const blogData = await request.json();

    const { title, description } = blogData;

    const blogValidate = z
      .object({
        title: z.string().min(6, { message: "Title is required!" }),
        description: z.string().min(6, { message: "Title is required!" }),
      })
      .safeParse({ title, description });

    if (!blogValidate.success) {
      return NextResponse.json({
        message: blogValidate.error.issues[0].message,
        validate: false,
      });
    }

    const newBlog = await Blog.create(blogData);

    return NextResponse.json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    // console.log(error);
    if (error instanceof z.ZodEffects) {
      return NextResponse.json({
        success: false,
        message: error.errors,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Network Error",
    });
  }
  return NextResponse;
}
