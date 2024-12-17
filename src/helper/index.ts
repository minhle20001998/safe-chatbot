/**
 * Cleans up the input string by converting it to lowercase, replacing special characters,
 * and removing any non-alphanumeric characters (except for spaces).
 * 
 * @param {string} input
 * @returns {string}
 */
const cleanUpInput = (input: string) => {
  // Convert the input string to lowercase
  return input.toLowerCase()
    // Replace all occurrences of "@" with "a"
    .replace(/[@]/g, 'a')
    // Replace all occurrences of "$" with "s"
    .replace(/[$]/g, 's')
    // Replace all occurrences of "#" with "h"
    .replace(/[#]/g, 'h')
    // Replace all occurrences of "3" with "e"
    .replace(/[3]/g, 'e')
    // Replace all occurrences of "4" with "a"
    .replace(/[4]/g, 'a')
    // Remove any characters that are not alphanumeric or spaces
    .replace(/[^a-z0-9\s]/gi, '')
}

/**
 * Logs the response to the console. This function is used to display chatbot responses in the console.
 * 
 * @param {any} response
 */
const chatbotConsole = (response: any) => {
  console.log(response)
}

export {
  cleanUpInput,
  chatbotConsole
}