import type { Options } from '@wdio/types';
import { config as mainConfig } from './wdio.conf.js';

(mainConfig.capabilities as WebdriverIO.Capabilities[]).forEach((cap) => {
  if (cap.browserName === 'chrome') {
    cap['goog:chromeOptions'] = {
      ...(cap['goog:chromeOptions'] || {}),
      args: [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
      ],
    };
  }
});

export const config: Options.Testrunner = {
  ...mainConfig,
};

