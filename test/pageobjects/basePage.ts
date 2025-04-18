class basePage {
    baseUrl = "https://telnyx.com/"
     
    async open() {
        await browser.url(this.baseUrl);
      }
  
    async getPageTitle() {
      return await browser.getTitle();
    }
  
    async getPageUrl() {
      return await browser.getUrl();
    }
  }
  
  export default basePage;