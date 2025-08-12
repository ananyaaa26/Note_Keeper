const fs = require("fs");
const path = require("path");
const validator = require("cli-validator-ananya"); // Import custom validation module

// Define the absolute path to notes.json file
const notesFilePath = path.join(__dirname, "data", "notes.json");

// Ensures that the data directory exists; creates it if not present
function ensureDataDirectory() {
  const dataDir = path.dirname(notesFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Saves an array of notes to the notes.json file.
 * Validates the format and structure before saving.
 * Returns true if saved successfully, false if validation fails or error occurs.
 */
function saveNotes(notes) {
  try {
    if (!Array.isArray(notes)) {
      console.log("[400] Invalid notes format — expected an array.");
      return false;
    }

    // Validate each note's structure and required fields
    const allValid = notes.every(note =>
      note &&
      validator.isValidNoteID(note.id || "dummyid") && // Validate note ID format
      !validator.isEmpty(note.title) &&                 // Title must not be empty
      !validator.isEmpty(note.body || note.content)     // Body/content must not be empty
    );

    if (!allValid) {
      console.log("[400] One or more notes are invalid. Not saving.");
      return false;
    }

    ensureDataDirectory(); // Make sure data directory exists before writing
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[500] Error saving notes:", err.message);
    return false;
  }
}

/**
 * Loads notes from the notes.json file.
 * If file does not exist or is corrupted, initializes with an empty array.
 */
function loadNotes() {
  try {
    if (!fs.existsSync(notesFilePath)) {
      ensureDataDirectory();
      fs.writeFileSync(notesFilePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }

    const dataBuffer = fs.readFileSync(notesFilePath);
    const dataJSON = dataBuffer.toString();

    const parsedNotes = dataJSON ? JSON.parse(dataJSON) : [];

    // Ensure parsed data is a valid array
    if (!Array.isArray(parsedNotes)) {
      console.log("[500] Notes file is corrupted. Resetting.");
      return [];
    }

    return parsedNotes;
  } catch (err) {
    console.error("[500] Error loading notes:", err.message);
    return [];
  }
}

module.exports = { saveNotes, loadNotes };
