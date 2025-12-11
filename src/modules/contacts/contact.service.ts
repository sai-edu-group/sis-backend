// CORE //
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Kysely } from "kysely";

// SERVICES //
import { GoogleSheetService, SheetAppendConfig } from "../../common/services/google-sheet.service";

// DTO //
import { CreateContactDto } from "./dto/create-contact.dto";
import { CreateNewsletterDto } from "./dto/create-newsletter.dto";
import { Database } from "../../core/database/schema";

@Injectable()
export class ContactService {
  constructor(
    @Inject("DB") private readonly db: Kysely<Database>,
    private readonly googleSheetService: GoogleSheetService,
  ) {}

  async getContacts() {
    return this.db.selectFrom("sis_awards").selectAll().execute();
  }

  /** API to insert the Contact in the Google Sheet */
  async createContact(payload: CreateContactDto): Promise<boolean> {
    // Get the data for Contact Sheet
    const sheetConfig = this.resolveSheetConfig(
      "GOOGLE_SHEETS_SPREADSHEET_ID",
      "GOOGLE_SHEETS_SHEET_NAME",
      "Sheet1",
    );

    // Add the Row to the Google Sheet - using the Google Sheet Service
    await this.googleSheetService.appendRow(
      [
        payload.fullName,
        payload.email,
        payload.phoneNumber,
        payload.reason,
        payload.message,
        new Date().toISOString(),
      ],
      sheetConfig,
    );

    return true;
  }

  /** Add the email (For Newsletter Subscription) into the Google Sheet */
  async subscribeNewsletter(payload: CreateNewsletterDto): Promise<boolean> {
    // Config the right Sheet creds
    const sheetConfig = this.resolveSheetConfig(
      "GOOGLE_SHEETS_NEWSLETTER_SPREADSHEET_ID",
      "GOOGLE_SHEETS_NEWSLETTER_SHEET_NAME",
      "Sheet1",
    );

    // Append the row to the Google Sheet - using the Google Sheet Service
    await this.googleSheetService.appendRow([payload.email, new Date().toISOString()], sheetConfig);

    return true;
  }

  /** Resolves the data into a proper Object for the Google Service */
  private resolveSheetConfig(
    spreadsheetIdKey: keyof NodeJS.ProcessEnv,
    sheetNameKey: keyof NodeJS.ProcessEnv,
    defaultSheetName: string,
  ): SheetAppendConfig {
    // Get the Spreadsheet ID
    const spreadsheetId = process.env[spreadsheetIdKey];
    if (!spreadsheetId) {
      throw new InternalServerErrorException(
        `Environment variable ${spreadsheetIdKey} is not configured`,
      );
    }

    // Get the Sheet Name
    const sheetName = process.env[sheetNameKey] || defaultSheetName;
    return { spreadsheetId, sheetName };
  }
}
