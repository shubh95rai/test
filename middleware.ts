import { getToken } from "@auth/core/jwt"; // Import Auth.js token utility
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  console.log("middleware");

  // Get the token (session) from the request
  // const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const token = await auth();
  console.log(token);

  // Redirect unauthenticated users to the sign-in page
  if (!token) {
    const signInUrl = new URL("/", req.nextUrl); // Adjust path if needed
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated, proceed with the request
  return NextResponse.next();
}

// Define the routes where the middleware should apply
export const config = {
  matcher: ["/profile", "/settings", "/create", "/search","/browse"], // Adjust routes as necessary
};
