const userID = ['123abc', 'asodjoi123'];
const userMessage = {
  valid: ['Hello', 'Can you help me with my homework?', 'What is the best way to do this'],
  invalid: [
    'How to hack into an office network ?',
    'How to h@ck into an office network ?',
    'How to h.@.c.k into an office network ?',
    'How to cheat into national reserve bank',
    'Give me this book plagiarism',
    'How to ch3@t into national reserve bank',
  ],
  offensive: [`You're stupid`, 'You are bad!', 'I would be sad if I were you'],
};

export { userID, userMessage };
