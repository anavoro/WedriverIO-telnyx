import basePage from "./basePage";

export class signUpPage extends basePage {

    async getSignUpFormTitle() {
        const title = $("main section h1");
        return title;
    }

    async verifySignUpPageContent(expectedTitle: string) {
        const actualTitleElement = await this.getSignUpFormTitle();

        await expect(actualTitleElement).toBeDisplayed();
        await expect(actualTitleElement).toHaveText(expectedTitle);
    }
}

export default new signUpPage;