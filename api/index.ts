// api/index.ts
import "tsconfig-paths/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ResponseInterceptor } from "../src/common/interceptors/response.interceptor";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { INestApplication } from "@nestjs/common";

let cachedApp: INestApplication | null = null;

async function bootstrap(): Promise<INestApplication> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init(); // IMPORTANT: no app.listen()

    cachedApp = app;
  }
  return cachedApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  const express = app.getHttpAdapter().getInstance();
  return express(req, res);
}
