import { procedure } from '../trpc';

import stationsUntyped from './stations.json';

type Stations = Record<Uppercase<string>, string>;

const stations: Stations = stationsUntyped;

const tubeStationsMutations = procedure.mutation(() => {
  const results = {
    _KWS: 'King William Street',
    ...stations,
  };

  // persist data - todo

  return {
    results,
    numberOfEntries: Object.keys(results).length,
  };
});

export default tubeStationsMutations;
