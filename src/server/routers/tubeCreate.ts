/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import { faker } from '@faker-js/faker';

import { procedure } from '../trpc';
// import stationsUntyped from './stations.json';

const tubeStationsCreate = procedure
  .input(
    z.object({
      name: z.string().min(3, 'Please enter at least 3 characters'),
    }),
  )
  .mutation(async ({ input }) => {
    const returnValue = faker.lorem.lines();
    return new Promise((resolve, reset) => {
      setTimeout(() => {
        resolve(returnValue);
      }, 5000);
    });
  });

export default tubeStationsCreate;
