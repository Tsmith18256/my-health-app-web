import { BodyCompNav } from '@/features/body-comp/nav/body-comp-nav.component';
import { FloatingActionButton } from '@/shared/components/buttons/floating-action-button/floating-action-button.component';
import { ILayoutProps } from '@/shared/helper-types/layout-props.type';
import Link from 'next/link';
import styles from './body-comp-with-nav-layout.module.css';

export default function BodyCompNavLayout({ children }: ILayoutProps) {
  return (
    <div className={styles.container}>
      <BodyCompNav />

      {children}

      <Link href="/body-comp/new">
        <FloatingActionButton />
      </Link>
    </div>
  );
}
