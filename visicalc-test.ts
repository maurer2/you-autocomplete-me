/* eslint-disable @typescript-eslint/no-floating-promises */
import { google } from 'googleapis';
import 'dotenv/config';

const jwtClient = new google.auth.JWT(process.env.DB_EMAIL, undefined, process.env.DB_PRIVATE_KEY, [
  'https://www.googleapis.com/auth/spreadsheets',
]);

// authenticate request
jwtClient.authorize((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Successfully connected!');
  }
});

// Google Sheets API
const spreadsheetId = process.env.DB_SHEET;
const sheetRange = `${process.env.DB_SUBSHEET!}!A1:A2`;
const sheets = google.sheets('v4');
const values = [['meow1'], ['meow2']];

sheets.spreadsheets.values.update(
  {
    auth: jwtClient,
    spreadsheetId,
    range: sheetRange,
    valueInputOption: 'RAW',
    requestBody: {
      values,
    },
  },
  (error: any, response: any) => {
    if (error) {
      console.log(`The API returned an error`);
      console.log(error);
    } else {
      console.log(response);
    }
  },
);
