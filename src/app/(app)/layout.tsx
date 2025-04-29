"use client";

import { ILayoutProps } from "@/shared/helper-types/layout-props.type";
import { UserSettingsProvider } from "@/shared/state/user-settings/user-settings.state";

export default function UserSettingsLayout({ children }: ILayoutProps) {
  return <UserSettingsProvider>{children}</UserSettingsProvider>;
}
