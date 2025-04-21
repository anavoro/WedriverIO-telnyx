import basePage from "./basePage";

abstract class homePage extends basePage {

  abstract openNavigation(): void;
  abstract closeNavigation(): void;

  getPrimaryNavigationItems() {
    return $("#main-menu-content").$$("a, button");
  }

  abstract getSecondaryNavigationLinkByText(text: string): any;

  getHeroTitle() {
    return $("main section h1");
  }

  async verifyHomepageLoaded() {
    await expect($("h1")).toBeDisplayed();
    return this;
  }

  async verifyPageLoadTime(): Promise<number> {
    await browser.url("/");
    const loadTime = await browser.execute(() => {
      const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      return entry?.loadEventEnd ?? 0;
    });
    return loadTime;
  }

  getCookieWindow() {
    return $('#onetrust-consent-sdk');
  }

  getCookieBanner() {
    return $('#onetrust-banner-sdk');
  }

  getCookieCloseButton() {
    return $('.onetrust-close-btn-handler');
  }

  async closeCookieNotification() {
    await this.getCookieWindow().waitForDisplayed();
    await this.getCookieCloseButton().click();
  }

 async isCookieBannerHidden(timeout: number = 5000): Promise<boolean> {
    try {
      const cookieBannerElement = this.getCookieBanner(); 
      await browser.waitUntil(async () => {
        const style = await cookieBannerElement.getAttribute('style'); 
        return style?.includes('display: none') && style?.includes('visibility: hidden');
      }, { timeout });
      return true; 
    } catch (error) {
      return false; 
    }
  }

  getFooter() {
    return $("footer");
  }

  getcontactUsLink() { 
    return $('a span[data-content="Contact us"]').parentElement();
  }
  
  async goToContactUs() {
    await this.getcontactUsLink().click();
    return this;
  }

  getsignUpButtonInHeader() {
    return $("header a span[data-content='Sign up']");
  }

  getsignUpButtonInHeroSection() {
    return $("main section a[href='/sign-up']");
  }

  async goToSignUpPageViaHeader() {
    const headerSignUpButton = this.getsignUpButtonInHeader();
    await headerSignUpButton.click();
  }

  async goToSignUpPageViaHero() {
    const heroSignUpButton = this.getsignUpButtonInHeroSection();
    await heroSignUpButton.click();
  }

  getchatbotToggleButton() {
    return $("div.c-bGYNvC > svg");
  }

  getchatbotCloseButton() {
    return $('button[data-state="open"].c-cODSYQ');
  }

  getchatbotTitle() {
    return $("h4*=Ask our AI assistant");
  }

  getchatbotWelcomeMessage() {
    return $("*=I'm Telnyx's AI assistant.");
  }

  get chatbotTextbox() {
    return $(`[placeholder="Type your question here"]`);
  }

  async openChatbot() {
    await this.getchatbotToggleButton().click();
    await this.getchatbotTitle().waitForDisplayed({ timeout: 5000 });
    return this;
  }

  async closeChatbot() {
    await this.getchatbotCloseButton().click();
    return this;
  }

  async typeMessageInChatbot(message: string) {
    await this.chatbotTextbox.setValue(message);
    return this;
  }

  async sendMessageInChatbot() {
    await browser.keys('Enter');
    return this;
  }

  async getUserChatMessage(message: string) {
    return $(`//div[@class='c-bCIlIy c-bupPtx'][text()='${message}']`);
  }

  async getChatbotResponseMessage() {
    return $('div.c-bCIlIy.c-khViZk p');
  }
  
  async getHelpSectionTitle() {
    return $("h3*=What can I help with?");
  }

  async getHelpSectionTextbox() {
    return $(`textarea[placeholder="Enter text here"]`);
  }

  async getCloseHelpSectionButton() {
    return $('=Close chat');
  }

  async closeHelpSection() {
    const closeButton = await this.getCloseHelpSectionButton();
    await closeButton.click();
    return this;
  }

  async getModelNameElement() {
    return $("div.PJLV.PJLV-ihcbrhu-css");
  }

  async checkModelName(modelName: string) {
    const modelNameElement = await this.getModelNameElement();
    await modelNameElement.waitForDisplayed({ timeout: 5000 });
    const elementText = await modelNameElement.getText();
    await expect(elementText).toContain(modelName);
    return this;
  }

  async getHelpSectionResponseWindowElement() {
    return $("section[class^='c-cHwKMe']");
  }

  async getHelpSectionResponseWindow() {
    const responseWindow = await this.getHelpSectionResponseWindowElement();
    await responseWindow.waitForDisplayed({ timeout: 10000 });
    return responseWindow;
  }

  async getModelDropdownButton() {
    return $('button.c-ewUecD.PJLV');
  }

  async openModelDropdown() {
    const modelDropdownButton = await this.getModelDropdownButton();
    await modelDropdownButton.click();
    return this;
  }

  async getSelectModelDropdownButton() {
    return $('button[data-state="closed"].c-lgwftA');
  }

  async clickSelectModelDropdown() {
    const dropdownButton = await this.getSelectModelDropdownButton();
    await dropdownButton.click();
    return this;
  }

  async getModelOptionElement(modelName: string) {
    return $(`div[role="menuitem"]*=${modelName}`);
  }

  async clickModelOption(modelName: string) {
    const modelOption = await this.getModelOptionElement(modelName);
    await modelOption.click();
    return this;
  }

  async getModelSubmitButton() {
    return $('form.c-iuGHFg button[type="submit"]');
  }

  async clickModelSubmitButton() {
    const submitButton = await this.getModelSubmitButton();
    await submitButton.click();
    return this;
  }

  async selectModel(modelName: string) {
    await this.clickSelectModelDropdown();
    await this.clickModelOption(modelName);
    await this.clickModelSubmitButton();
    return this;
  }
  
  async getSuggestedTopicsContainer() {
    const suggestedTopicsContainer = $('.c-exwizl');
      return suggestedTopicsContainer; 
  }

  async getSuggestedTopicButton(topic: string) {
    const container = await this.getSuggestedTopicsContainer();
    const topicButton = container.$(`button*=${topic}`);
    return topicButton;
  }

  getBlogBtn() {
    return $('a*=See All Blog Articles');
  }

  async goToBlog() {
    await this.getBlogBtn().click();
    return this;
  }
}
export default homePage;
