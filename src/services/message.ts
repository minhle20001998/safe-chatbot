import { logChatbotResponse, logUserMessage } from "../configs/logger"
import { CHATBOT_MESSAGES } from "../constants"
import { chatbotConsole } from "../helper"
import { isInputAllowed, isInputOffensive } from "./verifier"

/**
 * Handle user's message and create a chatbot response.
 * @param userId - The user's id.
 * @param message - The user's message.
 * @returns
 */
const handleUserMessage = (userId: string) => {
  // Return a function that processes the user's input for the given userId.
  return (userInput: string) => {
    // Log the user's input for debugging purposes.
    logUserMessage(userId, userInput)

    // Initialize a flag to determine whether the user's message is valid.
    let isValidMessage = true

    // Check if the user's input is disallowed (contains forbidden content).
    if (!isInputAllowed(userInput)) {
      isValidMessage = false
    }

    // Check if the user's input contains offensive or abusive language.
    else if (isInputOffensive(userInput)) {
      isValidMessage = false
    }

    // Generate the chatbot's response based on whether the message is valid.
    const chatbotResponse = isValidMessage
      ? `${CHATBOT_MESSAGES.VERIFIED_MESSAGE_RESPONSE}${userInput}`
      : `${CHATBOT_MESSAGES.UNVERIFED_MESSAGE_RESPONSE}`

    // Log the chat's response for debugging purposes.
    logChatbotResponse(userId, chatbotResponse)

    // Display the chatbot's response to the user via the console.
    chatbotConsole(chatbotResponse)
  }
}

export { handleUserMessage }