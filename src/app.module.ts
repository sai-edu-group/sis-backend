// MODULES //
import { ContactModule } from "@/modules/contacts/contact.module";
import { DatabaseModule } from "@/core/database/database.module";
import { AwardsModule } from "./modules/awards/awards.module";
import { PressReleasesModule } from "@/modules/press-releases/press-releases.module";

// CONTROLLERS //
import { AppController } from "@/app.controller";

// SERVICES //
import { AppService } from "@/app.service";

// OTHERS //
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContactModule, DatabaseModule, AwardsModule, PressReleasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
