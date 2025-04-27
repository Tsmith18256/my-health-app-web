import { BodyCompNav } from '@/features/body-comp/nav/body-comp-nav.component';
import { ILayoutProps } from '@/shared/helper-types/layout-props.type';

export default function BodyCompNavLayout({ children }: ILayoutProps) {
  return (
    <>
      <BodyCompNav />

      {children}
    </>
  );
}
