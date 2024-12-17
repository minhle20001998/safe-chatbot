import { describe, expect, it, vi } from "vitest";
import { chatbotConsole, cleanUpInput } from ".";

describe('cleanUpInput function', () => {
  it('should convert input to lowercase', () => {
    const input = 'Hello WORLD';
    const result = cleanUpInput(input);
    expect(result).toBe('hello world');
  });

  it('should replace @ with a', () => {
    const input = 'hello@world';
    const result = cleanUpInput(input);
    expect(result).toBe('helloaworld');
  });

  it('should replace $ with s', () => {
    const input = 'price$';
    const result = cleanUpInput(input);
    expect(result).toBe('prices');
  });

  it('should replace # with h', () => {
    const input = 'hashtag#test';
    const result = cleanUpInput(input);
    expect(result).toBe('hashtaghtest');
  });

  it('should replace 3 with e', () => {
    const input = 'h3llo';
    const result = cleanUpInput(input);
    expect(result).toBe('hello');
  });

  it('should replace 4 with a', () => {
    const input = '4ever';
    const result = cleanUpInput(input);
    expect(result).toBe('aever');
  });

  it('should replace all special characters', () => {
    const input = 'hello! @world# 1234$';
    const result = cleanUpInput(input);
    expect(result).toBe('hello aworldh 12eas');
  });

  it('should handle empty input', () => {
    const input = '';
    const result = cleanUpInput(input);
    expect(result).toBe('');
  });

  it('should handle input with only non-alphanumeric characters', () => {
    const input = '@#$%^';
    const result = cleanUpInput(input);
    expect(result).toBe('ahs');
  });

  it('should handle input with only numbers', () => {
    const input = '12789';
    const result = cleanUpInput(input);
    expect(result).toBe('12789');
  });
});

describe('chatbotConsole function', () => {
  it('should log the response to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const response = 'Chatbot: Hello!';
    
    chatbotConsole(response);
    
    expect(consoleSpy).toHaveBeenCalledWith(response);
    
    consoleSpy.mockRestore();
  });
});