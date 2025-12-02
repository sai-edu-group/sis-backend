// MODULES //
import { ContactModule } from "@/modules/contacts/contact.module";
import { DatabaseModule } from "@/core/database/database.module";
import { AwardsModule } from "./modules/awards/awards.module";
import { SioneersModule } from "@/modules/sioneers/sioneers.module";

// CONTROLLERS //
import { AppController } from "@/app.controller";

// SERVICES //
import { AppService } from "@/app.service";

// OTHERS //
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContactModule,
    DatabaseModule,
    AwardsModule,
    SioneersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
