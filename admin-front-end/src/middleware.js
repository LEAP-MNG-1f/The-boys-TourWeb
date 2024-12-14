// middleware.ts (recommended to change extension to .ts)
import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired((req) => {
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
