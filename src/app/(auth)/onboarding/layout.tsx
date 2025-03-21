import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function OnboardingLayout(props: PropsWithChildren) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.onboardingComplete) {
    redirect('/body-comp/log');
  }

  return <>{props.children}</>;
}
