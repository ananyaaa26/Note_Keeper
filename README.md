# 📝 Note Keeper CLI

A simple **Command-Line Interface (CLI)** application built with **Node.js** for managing notes with **user authentication**.  
Users can log in, create, view, edit, and delete notes, which are saved persistently in a JSON file.

---

## 📌 Features

- **User Authentication**
  - Login system with credentials stored in `users.txt`
  - Prevents unauthorized access to notes

- **Note Management**
  - Add new notes
  - View all saved notes
  - Edit existing notes
  - Delete notes

- **Persistent Storage**
  - Notes stored in `data/notes.json`
  - Data preserved between sessions

---

## 📂 Project Structure

note-keeper
│
├── index.js # Entry point for CLI
├── fileHandler.js # Handles file read/write operations
├── loginManager.js # Manages user login authentication
├── noteManager.js # Handles note creation, editing, deletion
├── users.txt # Stores usernames and passwords
├── data/
│ └── notes.json # JSON storage for notes
└── Note.docx # Project documentation


