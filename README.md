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

```
note-keeper-fix/
│
├── index.js            # Entry point for CLI
├── fileHandler.js      # Handles file read/write operations
├── loginManager.js     # Manages user login authentication
├── noteManager.js      # Handles note creation, editing, deletion
├── users.txt           # Stores usernames and passwords
├── data/
│   └── notes.json      # JSON storage for notes
└── Note.docx           # Project documentation
```

---

## 🛠️ Installation & Usage

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Application
```bash
node index.js
```

---

## ⚙️ Requirements
- **Node.js** v14+
- **npm** (Node Package Manager)

---

## 🔑 Login Details
User credentials are stored in **`users.txt`** in the format:
```
username:password
```
> Default credentials can be added manually before first run.

---

## 📦 Data Storage
- Notes are stored in `data/notes.json` as an array of note objects.
- Each note has:
```json
{
  "id": 1,
  "title": "Sample Note",
  "content": "This is a note content.",
  "timestamp": "2025-08-12T12:00:00Z"
}
```

---

## 📋 Command Menu Usage

Once logged in, the CLI displays a menu like:
```
1. Add a note
2. View all notes
3. Edit a note
4. Delete a note
5. Exit
```

### 1. Add a note
- Prompts for **Title** and **Content**
- Saves note to `data/notes.json`

### 2. View all notes
- Displays list of saved notes with IDs and timestamps

### 3. Edit a note
- Prompts for note **ID** to edit
- Allows modifying title or content

### 4. Delete a note
- Prompts for note **ID** to delete
- Removes note from JSON file

### 5. Exit
- Safely closes the application

---


