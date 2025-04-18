
import homePageDesktop from "../pageobjects/homePageDesktop";
import { expect } from '@wdio/globals'; 

export const availableModels: string[] = [
    'anthropic/claude-3-7-sonnet-latest',
    'fixie-ai/ultravox-v0_4',
    'google/gemma-2b-it',
    'meta-llama/Llama-2-13b-chat-hf'
];

 describe("Help Section Interaction", () => {
    before(async () => {
      await browser.deleteAllCookies();
        await homePageDesktop.open();
    });

  it("should show the chatbot title", async () => {
    const titleElement = await homePageDesktop.getHelpSectionTitle();
    await titleElement.waitForDisplayed({ timeout: 10000 }); 
    await expect(await titleElement.getText()).toContain("What can I help with?"); 
});

it("should show the chatbot input textbox", async () => {
    const textbox = await homePageDesktop.getHelpSectionTextbox();
    await expect(textbox).toBeDisplayed();  
  });

  it("should allow entering and submitting a query", async () => {
    const textbox = await homePageDesktop.getHelpSectionTextbox();
    await textbox.setValue("Hello, I need help");
    await browser.keys("Enter");
    await browser.pause(2000);
  });

  it("should display a chatbot response", async () => {
    const responseWindow = await homePageDesktop.getHelpSectionResponseWindow();
    await expect(responseWindow).toBeDisplayed(); 
    await expect(await responseWindow.getText()).not.toBe(''); 
  });
  
  it("should close the chat", async () => {
    await homePageDesktop.closeHelpSection();
    const responseWindowElement = await homePageDesktop.getHelpSectionResponseWindow();
    const responseExists = await responseWindowElement.isExisting();
    await expect(responseExists).toBe(false);
  });

 it("should open model dropdown and select a model", async () => {
    await homePageDesktop.getModelDropdown();

    const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)];
    await homePageDesktop.selectModel(randomModel);
    const textbox = await homePageDesktop.getHelpSectionTextbox();
    await textbox.setValue("Hello from model test");
    await browser.keys("Enter");
    const responseWindow = await homePageDesktop.getHelpSectionResponseWindow();
    await expect(await responseWindow.isDisplayed()).toBe(true);
    await homePageDesktop.checkModelName(randomModel);
    await homePageDesktop.closeHelpSection();
  });
  

  it("should click on suggested topics and receive relevant response", async () => {
    const expectedTopics = [
        'Draft a 10DLC messaging campaign',
        'What is an eSIM?',
        'What are some use cases of LLMs for real-time voice or messaging?',
        'How can bi-directional streaming improve my call center?',
      ];
  
      for (const topicText of expectedTopics) {
        const topicButton = await homePageDesktop.getSuggestedTopicButton(topicText);
        await expect(topicButton).toBeDisplayed();
      }
  
      const randomIndex = Math.floor(Math.random() * expectedTopics.length);
      const randomTopic = expectedTopics[randomIndex];
      const randomTopicButton = await homePageDesktop.getSuggestedTopicButton(randomTopic);
      await randomTopicButton.click();
  
      const responseWindow = await homePageDesktop.getHelpSectionResponseWindow();
      await expect(responseWindow).toBeDisplayed();
      await expect(await responseWindow.getText()).toContain(randomTopic);

  });
 });
