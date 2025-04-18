import type { Options } from '@wdio/types';
import * as mainConfigModule from './wdio.conf.js';
const mainConfig = mainConfigModule.config;

export const config: Options.Testrunner = {
  ...mainConfig,
  ...{
    capabilities: [
      {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--headless=new',
            '--disable-gpu',
            '--no-sandbox',
            '--disable-dev-shm-usage'
          ],
        },
      },
    ],
  },
};