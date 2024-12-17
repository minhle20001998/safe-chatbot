import {
  describe,
  expect,
  vi,
  afterEach,
  it,
  beforeEach
} from 'vitest';
import { chatbot } from '.';
import { CHATBOT_MESSAGES, CONTINUE_CODE, EXIT_CODES } from './constants';
import { userID, userMessage } from './constants/test';


const mockState = vi.hoisted(() => {
  return {
    readlineCloseMock: vi.fn(),
    readlineQuestionMock: vi.fn(),
    chatbotConsoleMock: vi.fn(),
    handleUserMessageMock: vi.fn(),
    registeredHandlerMock: vi.fn()
  }
})

vi.mock('readline/promises');
vi.mock('./configs/readline', () => {
  return {
    readline: {
      close: mockState.readlineCloseMock,
      question: mockState.readlineQuestionMock
    }
  }
})
vi.mock('./helper', () => {
  return {
    chatbotConsole: mockState.chatbotConsoleMock
  }
});
vi.mock('./services/message', () => {
  return {
    handleUserMessage: (userId: string) => {
      mockState.handleUserMessageMock(userId)
      return mockState.registeredHandlerMock
    }
  }
})

describe('Chatbot Test', () => {

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('Should welcome user', async () => {
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    await chatbot()
    expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.WELCOME)
  })

  it('should prompt for user ID and handle user input', async () => {
    mockState.readlineQuestionMock.mockResolvedValueOnce(userID[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(userMessage.valid[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    await chatbot()
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_USERID)
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_MESSAGE)
    expect(mockState.handleUserMessageMock).toHaveBeenCalledWith(userID[0])
    await vi.waitFor(() => {
      expect(mockState.registeredHandlerMock).toHaveBeenCalledWith(userMessage.valid[0])
    })
  })

  it('should exit the loop when user inputs an exit command', async () => {
    mockState.readlineQuestionMock.mockResolvedValueOnce(userID[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce('Hello');
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    await chatbot()
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_USERID)
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_MESSAGE)
    await vi.waitFor(() => {
      expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.CONTINUE);
    })
  })

  it('should continue prompt the user after user choose to continue', async () => {
    mockState.readlineQuestionMock.mockResolvedValueOnce(userID[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce('Hello');
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(CONTINUE_CODE.YES)
    mockState.readlineQuestionMock.mockResolvedValueOnce(userID[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    await chatbot();
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_USERID)
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_MESSAGE)
    await vi.waitFor(() => {
      expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.CONTINUE);
    })
  })

  it('should goodbye user after session ends', async () => {
    mockState.readlineQuestionMock.mockResolvedValueOnce(userID[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce(EXIT_CODES[0])
    mockState.readlineQuestionMock.mockResolvedValueOnce('N')
    await chatbot();
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_USERID)
    expect(mockState.readlineQuestionMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ASK_MESSAGE)
    await vi.waitFor(() => {
      expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.GOODBYE);
    })
  })

  it('should print error if an exception occurs during the chatbot executio', async () => {
    mockState.readlineQuestionMock.mockRejectedValueOnce(new Error('Test error'))
    await chatbot();
    await vi.waitFor(() => {
      expect(mockState.chatbotConsoleMock).toHaveBeenCalledWith(CHATBOT_MESSAGES.ERROR);
    })
  })
})