import homePageBase from "./homePage";

class homePageMobile extends homePageBase {

  async openNavigation() {
    const openMenuButton = $("button=Open main menu");
    await openMenuButton.click();
  }

  async closeNavigation() {
    const closeMenuButton = $("button=Close main menu");
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
