import { Module } from "@nestjs/common";

// CONTROLLERS //
import { AppController } from "@/app.controller";

// SERVICES //
import { AppService } from "@/app.service";

// MODULES //
import { ContactModule } from "@/modules/contact/contact.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
