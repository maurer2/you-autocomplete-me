import { router } from '../trpc';
import tubeStations from './tube';
import tubeStationsCreate from './tubeCreate'
import tubeStationsDelete from './tubeDelete';
import tubeStationsRead from './tubeRead';

export const appRouter = router({
  tubeStations,
  tubeStationsCreate,
  tubeStationsDelete,
  tubeStationsRead,
});
// export type definition of API
export type AppRouter = typeof appRouter;
