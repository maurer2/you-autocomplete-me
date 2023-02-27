import { router } from '../trpc';
import tubeStations from './tube';
import tubeStationsMutations from './tubeMutation'

export const appRouter = router({
  tubeStations,
  tubeStationsMutations,
});
// export type definition of API
export type AppRouter = typeof appRouter;
