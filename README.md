# A11y Assistant

A **tiny, educational accessibility CLI** that detects **common a11y issues** in your HTML or static builds and explains:

- **What the problem is**
- **Why it matters**
- **How to fix it** with code examples

Perfect for catching basic accessibility problems early. In your local development environment.

## 🚀 Features

- Checks for **common accessibility issues**, including:
  - Missing `alt` text on images
  - Missing `<h1>` tags
  - Skipped heading levels
- Educational output with **plain language explanations** and **suggested fixes**
- Runs locally
- Lightweight and fast

## 📦 Installation

Install the package:

```bash
pnpm install
```

## 🛠 Usage
### Local Scan

Run against an HTML file:

```bash
pnpm a11y-assistant example.html
```

Example output:

![CLI output](./image.png)

## 📋 Roadmap
- More rules (links, colour contrast, ARIA patterns)
- Inline PR comments for detected issues
