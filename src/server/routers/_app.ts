import { router } from '../trpc';
import tubeStations from './tube';

export const appRouter = router({
  tubeStations,
});
// export type definition of API
export type AppRouter = typeof appRouter;
