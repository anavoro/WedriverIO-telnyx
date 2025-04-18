import basePage from "./basePage";

export class signUpPage extends basePage {

    async getContactFormTitle() {
        const title = $("main section h1");
        return title;
      }  
}

export default new signUpPage;