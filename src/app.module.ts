// MODULES //
import { ContactModule } from "./modules/contacts/contact.module";
import { DatabaseModule } from "./core/database/database.module";
import { AlbumsModule } from "./modules/albums/albums.module";
import { AwardsModule } from "./modules/awards/awards.module";
import { PressReleasesModule } from "./modules/press-releases/press-releases.module";
import { SioneersModule } from "./modules/sioneers/sioneers.module";
import { ResultsModule } from "./modules/results/results.module";
import { BlogsModule } from "./modules/blogs/blogs.module";

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
    AlbumsModule,
    AwardsModule,
    PressReleasesModule,
    SioneersModule,
    ResultsModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
