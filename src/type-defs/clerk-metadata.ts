export {}

declare global {
  /**
   * This interface is used to add custom data to Clerk.
   *
   * https://clerk.com/docs/references/nextjs/add-onboarding-flow
   */
  interface CustomJwtSessionClaims {
    metadata?: {
      onboardingComplete?: boolean;
    }
  }
}
