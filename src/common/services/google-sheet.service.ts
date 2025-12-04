// PLUGINS //
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { google, sheets_v4 } from "googleapis";

// PROJECT //
import { credentials } from "../../credentials/google-sheet-credentials";

export interface SheetAppendConfig {
  spreadsheetId: string;
  sheetName?: string;
}

@Injectable()
export class GoogleSheetService {
  private sheetsClient?: sheets_v4.Sheets;

  /**
   * Appends a row of values to the specified Google Sheet.
   *
   * @param values - An array of values to be appended as a row. Can contain strings, numbers, null, or undefined.
   * @param config - Configuration object containing the spreadsheet ID and optional sheet name.
   * @returns A Promise that resolves when the row has been successfully appended.
   */
  async appendRow(
    values: Array<string | number | null | undefined>,
    config: SheetAppendConfig,
  ): Promise<void> {
    if (!config?.spreadsheetId) {
      throw new InternalServerErrorException("Spreadsheet id must be provided to append rows");
    }

    // Get the Sheet to make changes
    const sheets = this.getSheetsClient();
    const sheetName = config.sheetName || "Sheet1";

    // Append the new Row into the Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "RAW",
      requestBody: {
        values: [values.map((value) => value ?? "")],
      },
    });
  }

  /**
   * Retrieves the authenticated Google Sheets client.
   * Initializes the client if it hasn't been created yet.
   *
   * @returns The authenticated Sheets client.
   */
  private getSheetsClient(): sheets_v4.Sheets {
    if (this.sheetsClient) {
      return this.sheetsClient;
    }

    if (!credentials.client_email || !credentials.private_key) {
      throw new InternalServerErrorException(
        "Google Sheets credentials.json is missing required fields",
      );
    }

    // Connect (Authenticate) to the Google Sheet API
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheetsClient = google.sheets({ version: "v4", auth });
    return this.sheetsClient;
  }
}
