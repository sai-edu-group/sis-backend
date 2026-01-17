import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Response Interceptor (to format data)
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable CORS
  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // set true ONLY if using cookies
  });

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
