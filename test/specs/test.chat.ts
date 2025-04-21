import { expect } from '@wdio/globals';
import homePageDesktop from "../pageobjects/homePageDesktop";

describe('Chatbot Interaction', () => {
     beforeEach(async () => {
       await homePageDesktop.open(); 
     });
  
     it('should open the chatbot', async () => {
        await homePageDesktop.openChatbot();
        await expect(await homePageDesktop.getchatbotTitle().isDisplayed()).toBe(true);
        await expect(await homePageDesktop.getchatbotWelcomeMessage().isDisplayed()).toBe(true);
        await expect(await homePageDesktop.chatbotTextbox.isDisplayed()).toBe(true);
      });
  
      it('should close the chatbot', async () => {
        await homePageDesktop.openChatbot();
        await homePageDesktop.closeChatbot();
        await expect(await homePageDesktop.getchatbotTitle().isDisplayed()).toBe(false);
        await expect(await homePageDesktop.getchatbotWelcomeMessage().isDisplayed()).toBe(false);
        await expect(await homePageDesktop.chatbotTextbox.isDisplayed()).toBe(false);
      });
  
      it('should send and receive a message in the chatbot', async () => {
          await homePageDesktop.openChatbot();
          const testMessage = 'Hello';
          await homePageDesktop.typeMessageInChatbot(testMessage);
          await homePageDesktop.sendMessageInChatbot();
  
          const userMessage = await homePageDesktop.getUserChatMessage(testMessage);
          await userMessage.waitForDisplayed({ timeout: 10000 });
          await expect(await userMessage.getText()).toBe(testMessage);
  
          const chatbotResponse = await homePageDesktop.getChatbotResponseMessage();
          await chatbotResponse.waitForDisplayed({ timeout: 10000 });
          await expect(await chatbotResponse.getText()).not.toBe('');
        });
});