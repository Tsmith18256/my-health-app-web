import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/welcome", "/sign-in(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req) => {
  const isPublic = isPublicRoute(req);
  if (!isPublic) {
    const welcomeUrl = new URL("/welcome", req.url);
    const bodyCompUrl = new URL("/body-comp/log");

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
