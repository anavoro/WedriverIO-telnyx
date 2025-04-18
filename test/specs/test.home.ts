import { expect, browser } from '@wdio/globals';
import homePageDesktop from "../pageobjects/homePageDesktop";
import signUpPage from "../pageobjects/signUpPage";
import contactUsPage from "../pageobjects/contactPage";

describe('Telnyx Website Functionality', () => {
  beforeEach(async () => {
    await homePageDesktop.open(); 
  });

  it('should have the correct page title', async () => {
    const title = await browser.getTitle();
    await expect(title).toBe('Telnyx - Global solutions for Communications, IOT, AI, Compute and Networking');
  });

  it('should display the hero title correctly', async () => {
    const heroTitle = homePageDesktop.getHeroTitle();
    await expect(await heroTitle.getText()).toBe('Experience AI-powered connectivity');
  });


  it('should meet homepage performance expectations', async () => {
    const loadTime = await homePageDesktop.verifyPageLoadTime();
    const performanceThreshold = 2000;
    await expect(loadTime).toBeLessThanOrEqual(performanceThreshold);
  });

    it('should close cookie notification when button is clicked', async () => {
      await homePageDesktop.getCookieWindow().waitForDisplayed();
      await homePageDesktop.closeCookieNotification();
    
      const isHidden = await homePageDesktop.isCookieBannerHidden(5000);
      await expect(isHidden).toBe(true);
    });

  it('should have a visible footer', async () => {
    const footer = homePageDesktop.getFooter();
    await expect(footer).toBeDisplayed();
  });

  it('should contain "©" in the footer', async () => {
    const footerText = homePageDesktop.getFooter();
    await expect(await footerText.getText()).toContain('©');
  });

  it('should redirect to the Sign Up page when clicking the header button', async () => {
    const signUpHeaderButton = homePageDesktop.getSignUpButtonInHeader();
    await signUpHeaderButton.click();
    await expect(browser).toHaveUrl('https://telnyx.com/sign-up');
    const signUpFormTitle = await signUpPage.getContactFormTitle(); 
    await expect(await signUpFormTitle.isDisplayed()).toBe(true);
    await expect(await signUpFormTitle.getText()).toBe('Create a Telnyx account');
  });

  it('should redirect to the Sign Up page when clicking the main body button', async () => {
    const signUpHeroButton = homePageDesktop.getSignUpButtonInHeroSection();
    await signUpHeroButton.click();
    await expect(browser).toHaveUrl('https://telnyx.com/sign-up');
  });

  it('should navigate to the Contact Us page', async () => {
    await homePageDesktop.goToContactUs();
    await expect(browser).toHaveUrl('https://telnyx.com/contact-us');
    const formTitle = await contactUsPage.getContactFormTitle();
    await expect(await formTitle.isDisplayed()).toBe(true);
    await expect(await formTitle.getText()).toContain('Talk to an expert');
  });

});