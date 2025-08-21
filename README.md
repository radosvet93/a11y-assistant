# A11y Assistant

A **tiny, educational accessibility CLI** that detects **common a11y issues** in your HTML or static builds and explains:

- **What the problem is**
- **Why it matters**
- **How to fix it** with code examples

Perfect for catching basic accessibility problems early. In your local development environment, in the CI, or even as a GitHub Action.

## 🚀 Features

- Checks for **common accessibility issues**, including:
  - Missing `alt` text on images
  - Form fields without labels
  - Skipped heading levels
- Educational output with **plain language explanations** and **suggested fixes**
- Runs locally, in CI, or as a GitHub Action
- Lightweight and fast (<1s on most projects)

## 📦 Installation

Install the package:

```bash
pnpm add a11y-assistant
```

## 🛠 Usage
### Local Scan

Run against an HTML file or a static build directory:

```bash
pnpx a11y-assistant ./dist/index.html
```

Example output:

```php-template
🔎 A11y Assistant Report

❌ <img> missing alt attribute
   💡 Why: Screen reader users rely on alt text to understand images.
   🛠 Fix: <img src="hero.png" alt="Company hero banner">

✅ Heading order is logical ✅

❌ <input> missing associated label
   💡 Why: Form fields must have labels so users know what information to enter.
   🛠 Fix:
   <label for="email">Email address</label>
   <input id="email">
```

### In a GitHub Action

Create `.github/workflows/a11y.yml`

```yaml
name: A11y Assistant

on:
  pull_request:
    branches: [main]

jobs:
  a11y-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: pnpm

      - name: Build
        run: pnpm build

      - name: Run A11y Assistant
        run: pnpx a11y-assistant ./dist/index.html
```

Now every pull request will run the a11y checks and show the report in the workflow logs.

## 📋 Roadmap
- More rules (links, colour contrast, ARIA patterns)
- JSON output for integration with other tools
- Inline PR comments for detected issues
- AI assistant layer to explain fixes in context
- VS Code extension for inline feedback

## 🤝 Contributing
PRs, ideas, and issues are welcome!

- Create a branch from main
- Run pnpm install
- Add or update a rule in src/rules

Test locally with:

```bash
pnpm build
pnpx a11y-assistant ./example.html
```

Open a pull request with a clear description
