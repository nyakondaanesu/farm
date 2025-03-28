import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, message } = await req.json();

    const newUser = new User({ name, email, message });

    // Timeout for saving user
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database Timeout")), 5000)
    );

    await Promise.race([newUser.save(), timeoutPromise]);

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    // Timeout for fetching users
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database Timeout")), 5000)
    );

    const users = await Promise.race([User.find(), timeoutPromise]);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}
