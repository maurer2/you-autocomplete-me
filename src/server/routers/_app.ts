import { router } from '../trpc';
import tubeStations from './tube';
import tubeStationsCreate from './tubeCreate'
import tubeStationsDelete from './tubeDelete';

export const appRouter = router({
  tubeStations,
  tubeStationsCreate,
  tubeStationsDelete,
});
// export type definition of API
export type AppRouter = typeof appRouter;
