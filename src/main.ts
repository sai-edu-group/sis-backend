import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Response Interceptor (to format data)
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable CORS
  app.enableCors({
    origin: ["https://uat.saicloudschool.in", "http://localhost:3000", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
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
