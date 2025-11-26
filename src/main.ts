import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

// Call the Bootstrap Function (Run the Server)
void (async () => {
  try {
    await bootstrap();
    console.log("Server started successfully");
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
