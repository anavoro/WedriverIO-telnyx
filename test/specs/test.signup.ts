import { expect, browser } from '@wdio/globals';
import homePageDesktop from "../pageobjects/homePageDesktop";
import signUpPage from "../pageobjects/signUpPage";

describe('Sign Up Functionality from Homepage', () => {
  beforeEach(async () => {
    await homePageDesktop.open();
  });

  it('should redirect to the Sign Up page when clicking the header button and verify page content', async () => {
    await homePageDesktop.goToSignUpPageViaHeader();
    await expect(browser).toHaveUrl('https://telnyx.com/sign-up');
    await signUpPage.verifySignUpPageContent('Create a Telnyx account');
  });

  it('should redirect to the Sign Up page when clicking the main body button and verify page content', async () => {
    await homePageDesktop.goToSignUpPageViaHero();
    await expect(browser).toHaveUrl('https://telnyx.com/sign-up');
    await signUpPage.verifySignUpPageContent('Create a Telnyx account');
  });
});