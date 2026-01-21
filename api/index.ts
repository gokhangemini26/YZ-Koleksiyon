import { NestFactory } from '@nestjs/core';
import { AppModule } from '../apps/api/src/app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let app: any;

async function bootstrap() {
    if (!app) {
        const expressApp = express();
        const adapter = new ExpressAdapter(expressApp);
        const nestApp = await NestFactory.create(AppModule, adapter);

        nestApp.enableCors();
        nestApp.setGlobalPrefix('api');

        await nestApp.init();
        app = expressApp;
    }
    return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const expressApp = await bootstrap();
    expressApp(req, res);
}
