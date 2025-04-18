import { expect, browser } from '@wdio/globals';
import homePageDesktop from "../pageobjects/homePageDesktop";
import blogPage from '../pageobjects/blogPage'; 

describe('Checking a blog', () => {
  before(async () => {
    await homePageDesktop.open();
    await homePageDesktop.goToBlog();
    await expect(browser).toHaveUrl('https://telnyx.com/resources'); 
  });

  it('should go to the Blog Page', async () => {
    const formTitle = await blogPage.getBlogTitle(); 
    await expect(formTitle).toBeDisplayed();
    await expect(await formTitle.getText()).toContain('Browse all articles, guides, and news');
  });

  it ('should find the relevant article', async () => {
    const searchBarSelector = '#search';
    await $(searchBarSelector).waitForExist({ timeout: 5000 });
    const searchBarElement = $(searchBarSelector);
    await searchBarElement.waitForDisplayed({ timeout: 5000 });
  
    await searchBarElement.setValue("AI");
    await browser.keys("Enter");
  
    const searchResultsTitleElement = blogPage.getSearchTitle();
    await searchResultsTitleElement.waitForDisplayed({ timeout: 10000 });
    await expect(await searchResultsTitleElement.getText()).toContain("AI");
  });
});