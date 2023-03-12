/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import { google } from 'googleapis';

import { TRPCError } from '@trpc/server';
import { procedure } from '../trpc';

// static settings
const spreadsheetId = process.env.DB_SHEET;
const sheetRange = process.env.DB_SUBSHEET;
const sheets = google.sheets('v4');

const tubeStationsCreate = procedure
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

    return sheets.spreadsheets.values
      .append({
        auth: jwtClient,
        spreadsheetId,
        range: sheetRange,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[input.name]],
        },
      })
      .then((response) => response.data)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: error.message || 'spreadsheets update error',
          });
        }
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'unknown error',
        });
      });
  });

export default tubeStationsCreate;
