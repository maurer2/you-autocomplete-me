import type { AppType } from 'next/app';
import WithNavbar from '@/layout/WithNavbar';

import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => (
  <WithNavbar>
    <Component {...pageProps} />
  </WithNavbar>
);
export default trpc.withTRPC(MyApp);
