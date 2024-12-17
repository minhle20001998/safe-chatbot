import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateChatbotLogEntry, generateUserLogEntry, LOG_FILE_PATH, logChatbotResponse, logUserMessage } from "./logger";
import { afterEach } from "node:test";
import { userID, userMessage } from "../constants/test";
import * as fs from "fs";
import { CHATBOT_MESSAGES } from "../constants";

describe('Logger test', () => {

  afterAll(() => {
    // Clean up the log file after testing
    if (fs.existsSync(LOG_FILE_PATH)) {
      fs.unlinkSync(LOG_FILE_PATH);
    }
  });

  it('should log user message to log file', () => {
    const date = new Date().toISOString()
    logUserMessage(userID[0], userMessage.valid[0], date)

    const logFileContent = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
    expect(logFileContent).toMatch(generateUserLogEntry(userID[0], userMessage.valid[0], date))
  })

  it('should log chat bot response to log file', () => {
    const date = new Date().toISOString()
    logChatbotResponse(userID[0], CHATBOT_MESSAGES.VERIFIED_MESSAGE_RESPONSE, date)

    const logFileContent = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
    expect(logFileContent).toMatch(generateChatbotLogEntry(userID[0], CHATBOT_MESSAGES.VERIFIED_MESSAGE_RESPONSE, date))
  })
})