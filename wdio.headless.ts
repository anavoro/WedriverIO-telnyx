import type { Options } from '@wdio/types';
import { config as mainConfig } from './wdio.conf.js';

export const config: WebdriverIO.Config = {
  ...mainConfig,
  capabilities: [{
    browserName: 'chromium',
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
  }]
};


