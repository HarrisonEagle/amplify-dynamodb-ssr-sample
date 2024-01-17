import { fetchAuthSession } from "aws-amplify/auth/server";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import awsmobile from "./aws-exports";

// resolve edge nodejs api not supported error
const { runWithAmplifyServerContext } = createServerRunner({
  config: awsmobile,
});

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const response = NextResponse.next();
    // The runWithAmplifyServerContext will run the operation below
    // in an isolated matter.
    const authenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        try {
          // The fetch will grab the session cookies
          const session = await fetchAuthSession(contextSpec, {});
          return session.tokens !== undefined;
        } catch (error) {
          console.log("unauthorized");
          return false;
        }
      },
    });
  
    // If user is authenticated then the route request will continue on
    if (authenticated) {
      return response;
    }
  
    // If user is not authenticated they are redirected to the /login page
    return NextResponse.redirect(new URL("/auth", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};