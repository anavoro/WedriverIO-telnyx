import homePage from "./homePage";

class homePageDesktop extends homePage {

  openNavigation(): void {
  }

  closeNavigation(): void {
  }

  getPrimaryNavigationItems() {
    return $("#main-menu-content").$$("a, button");
  }

  getSecondaryNavigationLinkByText(text: string) {
    return $(`//div[@class='c-ihSZrZ']/a[normalize-space(text())='${text}']`);
  }
}
  
export default new homePageDesktop;
