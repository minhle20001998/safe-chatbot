import { describe, expect, it } from 'vitest';
import { isInputAllowed, isInputOffensive } from './verifier';
import { userMessage } from '../constants/test';

describe('Verifier methods', () => {
  it('should isInputAllowed return true for valid messages', () => {
    expect(isInputAllowed(userMessage.valid[0])).toBeTruthy();
    expect(isInputAllowed(userMessage.valid[1])).toBeTruthy();
    expect(isInputAllowed(userMessage.valid[2])).toBeTruthy();
  });

  it('should isInputAllowed return false for invalid messages', () => {
    expect(isInputAllowed(userMessage.invalid[0])).toBeFalsy();
    expect(isInputAllowed(userMessage.invalid[1])).toBeFalsy();
    expect(isInputAllowed(userMessage.invalid[2])).toBeFalsy();
    expect(isInputAllowed(userMessage.invalid[3])).toBeFalsy();
    expect(isInputAllowed(userMessage.invalid[4])).toBeFalsy();
    expect(isInputAllowed(userMessage.invalid[5])).toBeFalsy();
  });

  it('should isInputOffensive return false for valid messages', () => {
    expect(isInputOffensive(userMessage.valid[0])).toBeFalsy();
    expect(isInputOffensive(userMessage.valid[1])).toBeFalsy();
    expect(isInputOffensive(userMessage.valid[2])).toBeFalsy();
  });

  it('should isInputOffensive return true for offensive messages', () => {
    expect(isInputOffensive(userMessage.offensive[0])).toBeTruthy();
    expect(isInputOffensive(userMessage.offensive[1])).toBeTruthy();
    expect(isInputOffensive(userMessage.offensive[2])).toBeTruthy();
  });
});
