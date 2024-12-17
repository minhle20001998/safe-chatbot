const DISALLOWED_WORDS = [
  "hack", "hacking", "scam", "scamming", "cheat", "cheating", "plagiarism"
];

const EXIT_CODES = ['exit', 'quit']

const CHATBOT_MESSAGES = {
  WELCOME: `Chatbot: Hello! Type 'exit' or 'quit' to leave.`,
  ASK_USERID: `Enter your User ID: `,
  ASK_MESSAGE: `Enter your message: `,
  VERIFIED_MESSAGE_RESPONSE: 'Chatbot: I hear you say: ',
  UNVERIFED_MESSAGE_RESPONSE: `Chatbot: I'm sorry, but I can't assist with that request.`,
  CONTINUE: 'Do you want to continue using chatbot ? (Y/N)',
  ERROR: 'Something wrong happened, please try again later',
  GOODBYE: 'Chatbot session ended, Goodbye !'
}

const CONTINUE_CODE = {
  YES: 'y'
}

export { DISALLOWED_WORDS, CHATBOT_MESSAGES, CONTINUE_CODE, EXIT_CODES } 