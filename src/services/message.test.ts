import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleUserMessage } from "./message";
import { userID, userMessage } from "../constants/test";
import { CHATBOT_MESSAGES } from "../constants";

const mockState = vi.hoisted(() => {
  return {
    chatbotConsoleMock: vi.fn(),
    logChatbotResponseMock: vi.fn(),
    logUserMessageMock: vi.fn(),
    isInputAllowedMock: vi.fn(),
    isInputOffensiveMock: vi.fn()
  }
})

vi.mock('readline/promises');

vi.mock('../configs/logger', () => {
  return {
    logChatbotResponse: mockState.logChatbotResponseMock,
    logUserMessage: mockState.logUserMessageMock
  }
})

vi.mock('./verifier', () => {
  return {
    isInputAllowed: mockState.isInputAllowedMock,
    isInputOffensive: mockState.isInputOffensiveMock
  }
})

vi.mock('../helper', () => {
  return {
    chatbotConsole: mockState.chatbotConsoleMock
  }
});

describe('Handle User Message', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should log user input and respond with a verified message for valid input', () => {
    const userMessageHandler = handleUserMessage(userID[0]);
    // Mock isInputAllowed to return true and isInputOffensive to return false
    vi.mocked(mockState.isInputAllowedMock).mockReturnValueOnce(true);
    vi.mocked(mockState.isInputOffensiveMock).mockReturnValueOnce(false);
    userMessageHandler(userMessage.valid[0]);

    // Validate the logging of user input
    expect(mockState.logUserMessageMock).toHaveBeenCalledWith(userID[0], userMessage.valid[0]);

    // Validate chatbot's response
    const response = `${CHATBOT_MESSAGES.VERIFIED_MESSAGE_RESPONSE}${userMessage.valid[0]}`
    expect(mockState.logChatbotResponseMock).toHaveBeenCalledWith(userID[0], response);
    expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(response)
  })

  it('should respond with an unverified message for input that fails the allowed content check', () => {
    const userMessageHandler = handleUserMessage(userID[0]);

    // Mock isInputAllowed to return false
    vi.mocked(mockState.isInputAllowedMock).mockReturnValueOnce(false);
    vi.mocked(mockState.isInputOffensiveMock).mockReturnValueOnce(false);
    userMessageHandler(userMessage.invalid[0]);

    // Validate the logging of user input
    expect(mockState.logUserMessageMock).toHaveBeenCalledWith(userID[0], userMessage.invalid[0]);

    // Validate chatbot's response
    const response = `${CHATBOT_MESSAGES.UNVERIFED_MESSAGE_RESPONSE}`
    expect(mockState.logChatbotResponseMock).toHaveBeenCalledWith(userID[0], response);
    expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(response)
  })

  it('should respond with an unverified message for input that contains offensive content', () => {
    const userMessageHandler = handleUserMessage(userID[0]);

    // Mock isInputOffensive to return true
    vi.mocked(mockState.isInputAllowedMock).mockReturnValueOnce(true);
    vi.mocked(mockState.isInputOffensiveMock).mockReturnValueOnce(true);
    userMessageHandler(userMessage.invalid[0]);

    // Validate the logging of user input
    expect(mockState.logUserMessageMock).toHaveBeenCalledWith(userID[0], userMessage.invalid[0]);

    // Validate chatbot's response
    const response = `${CHATBOT_MESSAGES.UNVERIFED_MESSAGE_RESPONSE}`
    expect(mockState.logChatbotResponseMock).toHaveBeenCalledWith(userID[0], response);
    expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(response)
  })
})