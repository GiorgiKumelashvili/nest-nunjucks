import * as nunjucks from 'nunjucks';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

NestFactory.create<NestExpressApplication>(AppModule).then(async (app: NestExpressApplication) => {
  const assetsPath = path.join(__dirname, './assets');
  const logger = new Logger('app');

  const nunjuckMainRenderer = nunjucks.configure(assetsPath, {
    express: app,
    autoescape: true,
    watch: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
  });

  nunjuckMainRenderer.addFilter('log', function (value?: unknown): void {
    console.log(value);
  });
  nunjuckMainRenderer.addFilter('json', function (value?: unknown): string {
    return JSON.stringify(value);
  });

  app.enableCors();
  app.setViewEngine('njk');
  app.setBaseViewsDir(assetsPath);

  await app.listen(9000);

  // log misc stuff
  const apiUrl: string = await app.getUrl();
  logger.verbose(`Template builder api listening on --- ${apiUrl}`);
  logger.verbose(`Template builder api docs on --- ${apiUrl}/docs`);
});
