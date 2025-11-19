// CORE //
import { Module } from '@nestjs/common';

// SERVICES //
import { GoogleSheetService } from '@/common/services/google-sheet.service';
import { ContactService } from '@/modules/contact/contact.service';

// CONTROLLERS //
import { ContactController } from '@/modules/contact/contact.controller';

@Module({
  controllers: [ContactController],
  providers: [ContactService, GoogleSheetService],
  exports: [ContactService],
})
export class ContactModule {}
