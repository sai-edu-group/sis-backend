// CORE //
import { Module } from "@nestjs/common";

// SERVICES //
import { GoogleSheetService } from "@/common/services/google-sheet.service";
import { ContactService } from "@/modules/contacts/contact.service";

// MODULES //
import { DatabaseModule } from "@/core/database/database.module";

// CONTROLLERS //
import { ContactController } from "@/modules/contacts/contact.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService, GoogleSheetService],
  exports: [ContactService],
})
export class ContactModule {}
