import { NextRequest, NextResponse, userAgent } from "next/server";

export const deviceRedirectsMiddleware = (req: NextRequest) => {
  const url = req.nextUrl;
  const { device } = userAgent(req);

  const redirectPath = mobilePathRedirectsRecord[url.pathname];
  if (redirectPath && device.type === 'mobile') {
    const bodyCompLogUrl = new URL(redirectPath, req.url)

    return NextResponse.redirect(bodyCompLogUrl);
  }
};

const mobilePathRedirectsRecord: Record<string, string> = {
  // The base body-comp page shows the log and overview side-by-side and is only
  // meant for use on desktop.
  "/body-comp": "/body-comp/log"
};
