import { readline } from "./configs/readline";
import { CHATBOT_MESSAGES, CONTINUE_CODE, EXIT_CODES } from "./constants";
import { chatbotConsole } from "./helper";
import { handleUserMessage } from "./services/message";

/**
 * Main chatbot function for handling user input
 */
async function chatbot() {
  // Display a welcome message to the user when the chatbot starts.
  chatbotConsole(CHATBOT_MESSAGES.WELCOME);

  // Define the main chatbot interaction logic.
  const run = async () => {
    // Prompt the user for their unique ID and store it.
    const userId = await readline.question(CHATBOT_MESSAGES.ASK_USERID)
    const registeredHandler = handleUserMessage(userId)

    // Start a loop to continuously receive and process user messages.
    while (true) {
      // Prompt the user to enter a message.
      const userInput = await readline.question(CHATBOT_MESSAGES.ASK_MESSAGE);

      // Check if the user input matches any of the predefined exit codes
      if (EXIT_CODES.includes(userInput.toLowerCase())) {
        break;
      }

      // Pass the user input to the registered handler for processing.
      registeredHandler(userInput)
    }
  }

  //Execute the main chatbot logic
  const startChat = async () => {
    while (true) {
      // Run the main chatbot interaction.
      await run();

      // Once the main loop exits, prompt the user to decide whether to continue with another session.
      const continuePrompt = await readline.question(CHATBOT_MESSAGES.CONTINUE);

      // If the user chooses to continue, restart the `run` function.
      if (continuePrompt.toLowerCase() !== CONTINUE_CODE.YES) {
        chatbotConsole(CHATBOT_MESSAGES.GOODBYE);
        readline.close();
        break; // Exit the loop and close the chatbot.
      }
    }
  };

  startChat().catch((error) => {
    chatbotConsole(CHATBOT_MESSAGES.ERROR);
    readline.close();
  });
}

chatbot()

export { chatbot }