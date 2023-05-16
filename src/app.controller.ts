import * as nunjucks from 'nunjucks';

import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('mail/hello.njk')
  @Get()
  getHelloRender() {
    return {
      jsonObject: {
        hello: 123,
        wassup: {
          hello: ['12asd3', 134, true, false],
        },
        arr: [],
      },
    };
  }

  @Get('alternative')
  getHelloRenderAlternative() {
    return nunjucks.render('mail/hello.njk', {
      jsonObject: {
        hello: 123,
        wassup: {
          hello: ['12asd3', 134, true, false],
        },
        arr: [],
      },
    });
  }
}
