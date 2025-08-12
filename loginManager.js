// loginManager.js

const fs = require("fs");
const path = require("path");
const validator = require('cli-validator-ananya'); // Import custom validation package

// Absolute path to users.txt file where credentials are stored
const USERS_FILE = path.join(__dirname, "users.txt");

/**
 * Authenticates a user by checking their email and password
 * against the entries in users.txt (skips header line).
 * @param {string} email - User input email
 * @param {string} password - User input password
 * @returns {boolean} - true if credentials match, false otherwise
 */
function authenticateUser(email, password) {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    const lines = data.trim().split("\n").slice(1); // Skip the first line (assumed header)

    for (let line of lines) {
      const [storedEmail, storedPassword] = line.trim().split(",");
      if (storedEmail === email && storedPassword === password) {
        return true; // Match found
      }
    }
    return false; // No match found
  } catch (err) {
    // Handle error if users.txt is not accessible
    console.error("500 Internal Server Error: Could not read users.txt");
    return false;
  }
}

module.exports = {
  isValidEmail: validator.isValidEmail,       // Export email validation from package
  isValidPassword: validator.isValidPassword, // Export password validation from package
  authenticateUser                            // Export custom authentication function
};
