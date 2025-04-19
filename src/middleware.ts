import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/welcome", "/sign-in(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

/**
 * The middleware used for authentication. Authentication for this application
 * is done with Clerk: https://clerk.com/
 *
 * Note that if any of the redirects on this page are changed, it's likely that
 * environment variables need to change too. See the `.env` file or the Vercel
 * environment variables to see what might need to change.
 */
export default clerkMiddleware(async (auth, req) => {
  const isPublic = isPublicRoute(req);
  if (!isPublic) {
    const welcomeUrl = new URL("/welcome", req.url);
    const bodyCompUrl = new URL("/body-comp/log", req.url);

    await auth.protect(undefined, {
      unauthenticatedUrl: welcomeUrl.toString(),
      unauthorizedUrl: bodyCompUrl.toString(),
    });
  }

  const { sessionClaims, userId } = await auth();

  if (userId) {
    if (isPublic) {
      const homeUrl = new URL("/", req.url);

      return NextResponse.redirect(homeUrl);
    }

    if (
      !isOnboardingRoute(req) &&
      !sessionClaims?.metadata?.onboardingComplete
    ) {
      const onboardingUrl = new URL("/onboarding", req.url);

      return NextResponse.redirect(onboardingUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
