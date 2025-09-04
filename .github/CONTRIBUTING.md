# Contributing to a11y-assistant

First off, thank you for considering contributing to a11y-assistant!  
I welcome all contributions that help improve accessibility tooling for developers.  

Before making any significant changes, please open an issue to discuss what you'd like to work on. This helps avoid duplicate efforts and ensures your idea aligns with the project's goals.

Please also note that this project has a [Code of Conduct](./CODE_OF_CONDUCT.md), and I expect all contributors to follow it.

## Development Setup

1. Fork the repository and clone it locally.  
2. Install dependencies using `pnpm install`.  
3. Run tests using `pnpm test`.  
4. Create a feature branch from main, for example `feat/your-feature-name`.  

## Commit Messages & Release Workflow

The project is using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [release-please](https://github.com/googleapis/release-please) to automate changelog generation and versioning.  

Your commit messages should follow this format:

- `feat`: for new features  
- `fix`: for bug fixes  
- `docs`: for documentation changes  
- `chore`: for maintenance or tooling changes  
- `test`: for adding or updating tests  
- `refactor`: for code refactors without functional changes  
- `perf`: for performance improvements
- Adding '!' to anything from above, for example `feat!:` will signify that this is a breaking change   

Examples:  
- feat: add aria-label support for interactive components  
- fix: correct focus outline on modal dialog  
- docs: update README with usage examples
- feat!: update headings API

Do not bump versions manually.  
The GitHub Action will handle versioning and changelog entries based on your commit history, following SemVer.

## Pull Request Guidelines

When opening a PR:

1. Ensure the code is formatted (pnpm lint).  
2. Add or update tests if applicable.  
3. Update documentation if your change affects usage or APIs.  
4. Keep your PR focused – avoid unrelated changes.  
5. Link related issues in your PR description (e.g., Closes #123).  

I will review your PR. Once approved, it will be merged, and the release process will be automated.
