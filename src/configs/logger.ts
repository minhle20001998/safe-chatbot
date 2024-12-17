import * as fs from 'fs';
import path from 'path';

const nodeEnv = process.env.NODE_ENV;
console.log({ nodeEnv });

const isTestEnv = nodeEnv == 'test ';

export const LOG_FILE_PATH = path.join(`${__dirname}/../../`, isTestEnv ? 'chatbot_log.test.txt' : 'chatbot_log.txt');

/**
 * Log messages to a file with timestamp.
 * @param userId User ID.
 * @param message Message to log.
 */
function logUserMessage(userId: string, message: string, timestamp?: string): void {
  const time = timestamp ? timestamp : new Date().toISOString();
  const logEntry = generateUserLogEntry(userId, message, time);
  fs.appendFileSync(LOG_FILE_PATH, logEntry);
}

/**
 * Log response to a file with timestamp.
 * @param userId User ID.
 * @param response Response to log.
 */
function logChatbotResponse(userId: string, response: string, timestamp?: string) {
  const time = timestamp ? timestamp : new Date().toISOString();
  const logEntry = generateChatbotLogEntry(userId, response, time);
  fs.appendFileSync(LOG_FILE_PATH, logEntry);
}

function generateUserLogEntry(userId: string, message: string, timestamp: string) {
  return `[${timestamp}] userId: ${userId} | say: ${message}\n`;
}

function generateChatbotLogEntry(userId: string, response: string, timestamp: string) {
  return `[${timestamp}] userId: ${userId} | response: ${response}\n`;
}

export { logUserMessage, logChatbotResponse, generateUserLogEntry, generateChatbotLogEntry };
