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

  get signUpButtonInHeader() {
    return $("header a span[data-content='Sign up']");
  }

  get signUpButtonInHeroSection() {
    return $("main section a[href='/sign-up']");
  }

  async goToSignUpPageViaHeader() {
    const headerSignUpButton = this.signUpButtonInHeader;
    await headerSignUpButton.click();
  }

  async goToSignUpPageViaHero() {
    const heroSignUpButton = this.signUpButtonInHeroSection;
    await heroSignUpButton.click();
  }

  get chatbotToggleButton() {
    return $("div.c-bGYNvC > svg");
  }

  get chatbotCloseButton() {
    return $('button[data-state="open"].c-cODSYQ');
  }

  get chatbotTitle() {
    return $("h4*=Ask our AI assistant");
  }

  get chatbotWelcomeMessage() {
    return $("*=I'm Telnyx's AI assistant.");
  }

  get chatbotTextbox() {
    return $(`[placeholder="Type your question here"]`);
  }

  async openChatbot() {
    await this.chatbotToggleButton.click();
    await this.chatbotTitle.waitForDisplayed({ timeout: 5000 });
    return this;
  }

  async closeChatbot() {
    await this.chatbotCloseButton.click();
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


  async closeHelpSection() {
    const closeButton = $('=Close chat');;
    await closeButton.click();
    return this;
  }

  async checkModelName(modelName: string) {
    const modelNameElement = $("div.PJLV.PJLV-ihcbrhu-css");
    await modelNameElement.waitForDisplayed({ timeout: 5000 });
    const elementText = await modelNameElement.getText();
    await expect(elementText).toContain(modelName);
    return this;
  }
     
  async getHelpSectionResponseWindow() {
    return $("section[class^='c-cHwKMe']");
  }

  async getModelDropdown() {
    const modelDropdownButton = $('button.c-ewUecD.PJLV');
    await modelDropdownButton.click();
    return this;
  }

  async selectModel(modelName: string) {
      const dropdownButton = $('button[data-state="closed"].c-lgwftA');
      await dropdownButton.click(); 
  
      const modelOption =  $(`div[role="menuitem"]*=${modelName}`);
      await modelOption.click();  
  
      const submitButton = $('form.c-iuGHFg button[type="submit"]');
      await submitButton.click();
  
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

  get BlogBtn() {
    return $('a*=See All Blog Articles');
  }

  async goToBlog() {
    await this.BlogBtn.click();
    return this;
  }

}
export default homePage;
