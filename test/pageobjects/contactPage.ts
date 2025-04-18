import basePage from "./basePage";

export class contactPage extends basePage {

  async getContactFormTitle() {
    const title = $("main section h1");
    await title.waitForDisplayed({ timeout: 5000 }); 
    return title;
  }
}

export default new contactPage;