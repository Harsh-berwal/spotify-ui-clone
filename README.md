# Music Player UI

This is a music player web application built using HTML, CSS, and JavaScript.  
The project was created to practice JavaScript logic, DOM manipulation, and building interactive UI similar to modern music streaming platforms.

---

## 🛠 Tech Stack

- HTML  
- CSS  
- JavaScript  

---

## 📚 What I Learned

- Structuring a frontend project using modular files
- Working with JavaScript modules
- Handling audio playback using JavaScript
- Implementing search functionality
- Dynamically updating the UI using DOM manipulation
- Managing assets such as songs, images, and icons
- Improving UI consistency by cloning a real-world application

---

## ✨ Features

- 🔍 **Search Songs**
  - Search songs using the song name or artist/creator name.

- ▶️ **Play & Pause**
  - Play and pause songs using the main control button.

- ⏭ **Next & Previous**
  - Navigate between songs using next and previous controls.

- 📂 **Add Custom Songs**
  - You can add your own songs by placing `.mp3` files inside the `songs` folder.
  - Update `service.js` using the format:
    ```
    "Song Name - Artist Name.mp3"
    ```
  - The song will automatically appear in the UI and can be played.

- 🎵 **Dynamic Song List**
  - Songs are loaded dynamically using JavaScript instead of being hardcoded in HTML.

---

## 🚧 Project Status

Completed (for learning purposes)

---

## 🚧 Limitations / Future Improvements

- The **Trending Songs** section currently contains UI cards only.
- These cards do not have any functionality yet and are used mainly for layout and styling practice.
- Possible improvements include:
  - Adding click-to-play functionality for trending cards
  - Connecting trending songs directly to the player
  - Improving state management and UI interactions

---

## 🔧 Song Configuration (Developer Notes)

Songs are dynamically loaded from the `service.js` file.

To add new songs:
1. Place the `.mp3` file inside the `songs` folder.
2. Add the song name in `service.js` using the format:
