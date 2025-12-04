// MODULES //
import { ContactModule } from "./modules/contacts/contact.module";
import { DatabaseModule } from "./core/database/database.module";
import { AwardsModule } from "./modules/awards/awards.module";
import { PressReleasesModule } from "./modules/press-releases/press-releases.module";
import { SioneersModule } from "./modules/sioneers/sioneers.module";
import { ResultsModule } from "./modules/results/results.module";

// CONTROLLERS //
import { AppController } from "./app.controller";

// SERVICES //
import { AppService } from "./app.service";

// OTHERS //
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContactModule,
    DatabaseModule,
    AwardsModule,
    PressReleasesModule,
    SioneersModule,
    ResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
