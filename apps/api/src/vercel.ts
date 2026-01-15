import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createFetchHandler = async () => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(server),
    );
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.init();
    return server;
};

// Vercel serverless function entry
export default async function handler(req: any, res: any) {
    if (!server.listeners('request').length) {
        await createFetchHandler();
    }
    server(req, res);
}
