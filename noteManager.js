const { loadNotes, saveNotes } = require("./fileHandler");
const validator = require("cli-validator-ananya");

/**
 * Adds a new note to the notes list.
 * Validates title/body, checks for duplicates, then saves.
 */
function addNote(title, body) {
  try {
    // Validate that title and body are not empty
    if (validator.isEmpty(title) || validator.isEmpty(body)) {
      console.log("[400] Title or body cannot be empty.");
      return;
    }

    const notes = loadNotes();

    // Check for duplicate note title
    const duplicate = notes.find((note) => note.title === title);
    if (duplicate) {
      console.log("[409] Conflict: Note title already exists.");
      return;
    }

    // Add the new note
    notes.push({ title, body });

    // Save the updated notes list and check if successful
    const saved = saveNotes(notes);
    if (saved) {
      console.log("Note added successfully!");
    } else {
      console.log("[400] Note could not be saved due to validation failure.");
    }

  } catch (err) {
    // Handle any unexpected runtime errors
    console.error("[500] Error adding note:", err.message);
  }
}

/**
 * Removes a note based on its title.
 * Validates title and updates the notes list after filtering.
 */
function removeNote(title) {
  try {
    // Validate that the title is not empty
    if (validator.isEmpty(title)) {
      console.log("[400] Title cannot be empty.");
      return;
    }

    const notes = loadNotes();

    // Filter out the note with the matching title
    const filteredNotes = notes.filter((note) => note.title !== title);

    // Check if any note was actually removed
    if (notes.length === filteredNotes.length) {
      console.log("[404] No note found with that title.");
    } else {
      saveNotes(filteredNotes);
      console.log("Note removed successfully.");
    }
  } catch (err) {
    // Handle any unexpected runtime errors
    console.error("[500] Error removing note:", err.message);
  }
}

/**
 * Lists all saved notes with their titles.
 * Handles empty note lists.
 */
function listNotes() {
  try {
    const notes = loadNotes();

    // Handle case when no notes exist
    if (notes.length === 0) {
      console.log("No notes found.");
      return;
    }

    // Print note titles with numbering
    console.log("\nYour Notes:");
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.title}`);
    });
    console.log();
  } catch (err) {
    console.error("[500] Error listing notes:", err.message);
  }
}

/**
 * Displays a note's title and body by searching with the title.
 */
function readNote(title) {
  try {
    // Validate that the title is not empty
    if (validator.isEmpty(title)) {
      console.log("[400] Title cannot be empty.");
      return;
    }

    const notes = loadNotes();

    // Find the note with the matching title
    const note = notes.find((note) => note.title === title);

    if (!note) {
      console.log("[404] Note not found.");
    } else {
      console.log(`\nTitle: ${note.title}`);
      console.log(`Body: ${note.body}\n`);
    }
  } catch (err) {
    console.error("[500] Error reading note:", err.message);
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
