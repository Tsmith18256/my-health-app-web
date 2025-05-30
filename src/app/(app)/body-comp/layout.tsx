import { UserBodyCompEntriesProvider } from "@/features/body-comp/body-comp-entry/user-body-comp-entries/user-body-comp-entries.state";
import { ILayoutProps } from "@/shared/helper-types/layout-props.type";

/**
 * The layout for the body composition section of the site.
 */
export default function BodyCompLayout({ children }: ILayoutProps) {
  return <UserBodyCompEntriesProvider>{children}</UserBodyCompEntriesProvider>;
}
