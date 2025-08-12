const readline = require("readline");
const noteManager = require("./noteManager");
const login = require("./loginManager");
const validator = require("cli-validator-ananya"); // Import custom validator package

// Create readline interface for CLI input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user to log in before accessing menu
function promptLogin() {
  console.log("===== Login Required =====");

  rl.question("Enter your email: ", (email) => {
    // Validate email format
    if (!validator.isValidEmail(email)) {
      console.log("400 Bad Request: Invalid email format.");
      return rl.close();
    }

    rl.question("Enter your password: ", (password) => {
      // Validate password length
      if (!validator.isValidPassword(password)) {
        console.log("400 Bad Request: Password must be at least 6 characters.");
        return rl.close();
      }

      // Authenticate against users.txt
      if (login.authenticateUser(email.trim(), password.trim())) {
        console.log("Login successful!");
        showMenu(); // If successful, show main menu
      } else {
        console.log("401 Unauthorized: Invalid credentials.");
        rl.close();
      }
    });
  });
}

// Display main menu options
function showMenu() {
  console.log(`\n====== Note Keeper Menu ======
1. Add a note
2. Remove a note
3. List all notes
4. Read a note
5. Exit`);
  rl.question("\nEnter your choice: ", handleUserChoice);
}

// Handle user menu selection
function handleUserChoice(choice) {
  switch (choice.trim()) {
    case "1": // Add a note
      rl.question("Enter title: ", (title) => {
        if (validator.isEmpty(title)) {
          console.log("400 Bad Request: Title cannot be empty.");
          showMenu();
          return;
        }

        rl.question("Enter body: ", (body) => {
          if (validator.isEmpty(body)) {
            console.log("400 Bad Request: Body cannot be empty.");
            showMenu();
            return;
          }

          try {
            noteManager.addNote(title.trim(), body.trim());
          } catch (err) {
            console.error("Error while adding note:", err.message);
          }
          setTimeout(showMenu, 1000); // Return to menu after a short delay
        });
      });
      break;

    case "2": // Remove a note
      rl.question("Enter title to remove: ", (title) => {
        if (validator.isEmpty(title)) {
          console.log("400 Bad Request: Title cannot be empty.");
          showMenu();
          return;
        }

        try {
          noteManager.removeNote(title.trim());
        } catch (err) {
          console.error("Error while removing note:", err.message);
        }
        setTimeout(showMenu, 1000);
      });
      break;

    case "3": // List all notes
      try {
        noteManager.listNotes();
      } catch (err) {
        console.error("Error while listing notes:", err.message);
      }
      setTimeout(showMenu, 1000);
      break;

    case "4": // Read a specific note
      rl.question("Enter title to read: ", (title) => {
        if (validator.isEmpty(title)) {
          console.log("400 Bad Request: Title cannot be empty.");
          showMenu();
          return;
        }

        try {
          noteManager.readNote(title.trim());
        } catch (err) {
          console.error("Error while reading note:", err.message);
        }
        setTimeout(showMenu, 1000);
      });
      break;

    case "5": // Exit the program
      console.log("Exiting...");
      rl.close();
      break;

    default: // Handle invalid choices
      console.log("Invalid choice. Please try again.");
      setTimeout(showMenu, 1000);
      break;
  }
}

// Entry point of the application
promptLogin();
