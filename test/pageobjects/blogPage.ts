import basePage from "./basePage";

export class blogPage extends basePage {

  async getBlogTitle() {
    const title = $("main section h1");
    await title.waitForDisplayed({ timeout: 5000 }); 
    return title;
  }

  getSeachBar() {
    return $('#search'); 
  }

  getSearchTitle() {
    return $(`h2*=Search results for`);
  }
}

export default new blogPage;