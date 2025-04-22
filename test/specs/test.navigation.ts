import { expect, browser } from '@wdio/globals';
import homePageDesktop from "../pageobjects/homePageDesktop";
import homePageMobile from "../pageobjects/homePageMobile";
import homePage from '../pageobjects/homePage';

interface Config {
    viewType: "Desktop" | "Mobile";
    pageObject: typeof homePageDesktop | typeof homePageMobile; 
    viewportWidth: number;
    viewportHeight: number;
  }

  interface NavItem {
    text: string;
    link: string;
  }
  
  describe("Navigation Tests", () => {
    const testSuiteConfigurations: Config[] = [
      {
        viewType: "Desktop",
        pageObject: homePageDesktop,
        viewportWidth: 1920,
        viewportHeight: 1080,
      },
      {
        viewType: "Mobile",
        pageObject: homePageMobile,
        viewportWidth: 375,
        viewportHeight: 667,
      },
    ];
  
    testSuiteConfigurations.forEach((config) => {
      describe(`${config.viewType} view`, () => {
        let homePage: homePage; 
  
        beforeEach(async () => {
          await browser.setWindowSize(config.viewportWidth, config.viewportHeight);
          homePage = config.pageObject; 
          await browser.url('/'); 
        });
  
  
        it(`primary navigation contains the correct items in ${config.viewType} view`, async () => {
          homePage.openNavigation();
  
          const expectedNavItems = [
            "Products",
            "Solutions",
            "Pricing",
            "Why Telnyx",
            "Resources",
            "Developers",
          ];
  
          const primaryNavItems = homePage.getPrimaryNavigationItems();
          await expect(primaryNavItems).toBeElementsArrayOfSize(expectedNavItems.length);
          for (let i = 0; i < expectedNavItems.length; i++) {
            await expect(primaryNavItems[i]).toHaveText(expectedNavItems[i]);
          }
  
           homePage.closeNavigation();
        });
  
        it(`secondary navigation contains the correct items in ${config.viewType} view`, async () => {
          homePage.openNavigation();
  
          const expectedNavItems: NavItem[] = [
            { text: "SETI", link: "https://seti.telnyx.com" },
            { text: "Shop", link: "https://shop.telnyx.com" },
            { text: "Contact us", link: "/contact-us" },
            { text: "Log in", link: "https://portal.telnyx.com" },
          ];
  
          for (const item of expectedNavItems) {
            const linkElement = await homePage.getSecondaryNavigationLinkByText(item.text);
            await linkElement.waitForDisplayed({ timeout: 10000 }); 
            await linkElement.waitForClickable({ timeout: 5000 }); 
            await expect(linkElement).toHaveAttribute('href', item.link);
          }
  
          await homePage.closeNavigation();
        });
      });
    });
  });