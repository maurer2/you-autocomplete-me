import { router } from '../trpc';
import tubeStations from './tube';
import tubeStationsCreate from './tubeCreate'

export const appRouter = router({
  tubeStations,
  tubeStationsCreate,
});
// export type definition of API
export type AppRouter = typeof appRouter;
