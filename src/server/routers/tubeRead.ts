import { google } from 'googleapis';
import { TRPCError } from '@trpc/server';

import { procedure } from '../trpc';

// static settings
const spreadsheetId = process.env.DB_SHEET;
const sheetRange = process.env.DB_SUBSHEET;
const sheets = google.sheets('v4');

const tubeStationsRead = procedure.query(async () => {
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
      throw new Error("List can't be read");
    }

    if (!values.length) {
      return [];
    }

    return values.flatMap((value: string[]) => value);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message || 'spreadsheets update error',
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'unknown error',
      });
    }
  }
});

export default tubeStationsRead;
