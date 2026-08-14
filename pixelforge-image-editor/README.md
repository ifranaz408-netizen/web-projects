# 🎨 Pixelforge Image Editor

A lightweight, high-performance, client-side web application for editing, transforming, and converting images directly in your browser. Built with **Pure HTML, CSS, and JavaScript** without any external frameworks or AI dependencies.

🚀 **Live Demo:** (https://pixelforgeimage.netlify.app/)

---

## ✨ Features

- **📁 Image Upload & Drag-and-Drop:**
  - Easy file selection via browsing or dragging and dropping images directly into the editor.
- **🔄 Dynamic Canvas Transformations:**
  - Rotate images in 90-degree increments (clockwise/counter-clockwise).
  - Flip images horizontally and vertically.
  - Custom fit modes: `Contain`, `Cover`, and `Stretch`.
- **📐 Dimension & Aspect Ratio Control:**
  - Custom width and height resizing with an aspect ratio lock feature.
  - Built-in aspect ratio buttons (e.g., Free, 1:1, 16:9, etc.).
  - Quick-select resolution presets for fast adjustments.
- **🎨 Visual Effects & Filters:**
  - Real-time CSS canvas blur adjustment.
- **💾 Format Conversion & Export:**
  - Convert images to **PNG**, **JPG**, or **WEBP**.
  - Custom quality slider for compressed formats (JPG/WEBP).
  - Real-time file size and output resolution preview.
- **⌨️ Keyboard Shortcuts:**
  - `Ctrl + O`: Open file upload dialog.
  - `Ctrl + S`: Quick download edited image.
  - `Esc`: Clear active drag states.
- **⚡ Privacy First:**
  - All processing happens **100% locally** in the browser using the HTML5 Canvas API. No images are uploaded to any server.

---

## 🛠️ Tech Stack

- **Markup:** HTML5
- **Styling:** Custom CSS3 (Variables, Flexbox, Grid, Responsive Media Queries)
- **Scripting:** Modern Vanilla JavaScript (ES6+)
- **Graphics API:** HTML5 Canvas 2D Context
- **Hosting:** Netlify

---

## 📁 Project Structure

```text
pixelforge/
│
├── index.html       # Application HTML layout and UI components
├── style.css        # Global design tokens, editor layout, and animations
└── script.js       # App state management, canvas render pipeline, & handlers
