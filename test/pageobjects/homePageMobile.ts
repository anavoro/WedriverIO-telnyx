import homePageBase from "./homePage";

class homePageMobile extends homePageBase {

    getOpenNavigationButton() {
        return $("button=Open main menu");
      }
    
      async openNavigation() {
        const openMenuButton = await this.getOpenNavigationButton();
        await openMenuButton.click();
      }
    
      getCloseNavigationButton() {
        return $("button=Close main menu");
      }
    
      async closeNavigation() {
        const closeMenuButton = await this.getCloseNavigationButton();
        await closeMenuButton.click();
      }
      
  getPrimaryNavigationItems() {
    return $("#main-menu-content").$$("a, button");
  }

  async getSecondaryNavigationLinkByText(text: string) {
    const link = $('#main-menu').$(`a*=${text}`);
    return link;
  }
}

export default new homePageMobile;
