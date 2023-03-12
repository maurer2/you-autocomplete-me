import { z } from 'zod';
import { google } from 'googleapis';
import { TRPCError } from '@trpc/server';

import { procedure } from '../trpc';

// static settings
const spreadsheetId = process.env.DB_SHEET;
const sheetRange = process.env.DB_SUBSHEET;
const sheets = google.sheets('v4');

const tubeStationsDelete = procedure
  .input(
    z.object({
      name: z.string().min(3, 'Please enter at least 3 characters.'),
    }),
  )
  .mutation(async ({ input }) => {
    const jwtClient = new google.auth.JWT(
      process.env.DB_EMAIL,
      undefined,
      process.env.DB_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets'],
    );
    jwtClient.authorize((error) => {
      if (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error.message || 'jwtClient authorizing error',
        });
      }
    });

    try {
      const valuesResponse = await sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId,
        range: sheetRange,
      });

      const { values } = valuesResponse.data;
      if (!values) {
        throw new Error("spreadsheets values can't be read");
      }

      if (!values.length) {
        return 'list is empty';
      }

      const foundValues = values.filter((value: string[]) => value[0].includes(input.name));

      return foundValues.length
        ? 'has been found'
        : 'has not been found'
      ;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'spreadsheets update error',
        });
      }
    }
  });

export default tubeStationsDelete;
