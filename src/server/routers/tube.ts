import { z } from 'zod';
import { procedure } from '../trpc';

import stationsUntyped from './stations.json';

type Stations = Record<Uppercase<string>, string>;

// https://gist.github.com/paulcuth/1111303
// const lineNames = {
//   B: 'Bakerloo',
//   C: 'Central',
//   C2: 'Circle',
//   D: 'District',
//   // E: 'Elisabeth',
//   H: 'Hammersmith & City',
//   J: 'Jubilee',
//   M: 'Metropolitan',
//   N: 'Northern',
//   P: 'Piccadilly',
//   V: 'Victoria',
//   W: 'Waterloo & City'
// };

const stations: Stations = stationsUntyped;
const stationNames = Object.entries(stations);

const tubeStations = procedure
  .input(
    z.object({
      search: z.string().min(0),
    }),
  )
  // return value
  .query(({ input }) => {
    const results = stationNames.filter(([, stationName]) =>
      stationName.toLowerCase().includes(input.search.toLowerCase()),
    );

    return {
      search: input,
      results,
      numberOfEntries: results.length,
    };
  });

export default tubeStations;
