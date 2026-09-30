# 🚀 QuickTop — Smart & Elegant Scroll to Top Extension

<p align="center">
  <img src="icons/icon128.png" alt="QuickTop Logo" width="96" height="96" />
</p>

<p align="center">
  <b>A sleek, customizable, and lightweight Chrome Extension that brings a modern floating scroll-to-top button to every website.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/Version-1.0.0-emerald?style=for-the-badge" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
</p>

---

<p align="center">
  <video src="assets/videofinal.mp4" controls width="100%" poster="assets/poster.png"></video>
</p>

## ✨ Features

- 🎯 **Circular Scroll Progress Ring**: Real-time circular progress indicator showing exactly how far down the page you've scrolled.
- 🎨 **Multiple Vibrant Gradients**: Choose between curated styles:
  - 🟣 **Purple Dream** (`#667eea` → `#764ba2`)
  - 🌸 **Sunset Pink** (`#f093fb` → `#f5576c`)
  - 🌊 **Ocean Teal** (`#4facfe` → `#00f2fe`)
  - 🌿 **Mint Green** (`#43e97b` → `#38f9d7`)
  - 🍊 **Warm Orange** (`#fa8231` → `#f7b733`)
- 📐 **Customizable Position**: Place the floating button comfortably on either the **Bottom-Right** or **Bottom-Left** corner.
- 🎚️ **Scroll Threshold Control**: Adjust when the button appears (from 5% to 80% scroll depth).
- 📊 **Usage Statistics**: Track your total clicks and see how much scrolling time you've saved!
- ⚡ **Super Lightweight**: Built purely with vanilla JavaScript and modern CSS with zero heavy dependencies or tracking.
- 🔒 **Privacy Focused**: Operates locally on your browser with `chrome.storage.sync` and `chrome.storage.local`.

---

## 📸 Preview & Popup Controls

The QuickTop popup settings menu lets you tweak everything in real-time:

| Feature | Description |
| :--- | :--- |
| **Enable / Disable Toggle** | Quickly enable or disable the extension with a single switch |
| **Threshold Slider** | Set scroll percentage before the button becomes visible |
| **Position Switch** | Select ↙ Left or ↘ Right placement |
| **Theme Swatches** | Choose your favorite color palette instantly |
| **Stats Counter** | See your total lifetime scroll-to-top clicks |

---

## 🛠️ Installation & Setup (Developer Mode)

You can easily load and run this extension locally in Google Chrome or any Chromium-based browser (Brave, Edge, Opera, etc.):

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvsaini83/QuickTop.git
   ```
2. **Open Extensions page in Chrome:**
   - Navigate to `chrome://extensions/` in your browser URL bar.
3. **Enable Developer Mode:**
   - Toggle the switch labeled **Developer mode** in the top-right corner.
4. **Load the Extension:**
   - Click **Load unpacked** in the top-left.
   - Select the `QuickTop` project folder.
5. 🎉 **You're all set!** Browse any long website and scroll down to see the button smoothly fade in.

---

## 📂 Project Structure

```plaintext
QuickTop/
├── 📁 assets/            
│   ├── poster.png
│   ├── videofinal.mp4
├── 📁 icons/             # App icons (16x16, 48x48, 128x128)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── 📄 manifest.json      # Chrome Extension Manifest V3 configuration
├── 📄 content.js         # Content script injecting the button & handling animations
├── 📄 content.css        # Styles & animations for the floating button and progress ring
├── 📄 popup.html         # Settings popup UI
├── 📄 popup.css          # Glassmorphic styles for the popup dashboard
├── 📄 popup.js           # Settings manager & storage synchronization
└── 📄 README.md          # Documentation & setup guide
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/dhruvsaini83/QuickTop/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  Made with ❤️ by <a href="https://github.com/dhruvsaini83">Dhruv Saini</a>
</p>
