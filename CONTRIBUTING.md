# Contributing to VelcoreTech.com

Thank you for your interest in contributing to VelcoreTech.com! This document provides guidelines and workflows for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [SEO Guidelines](#seo-guidelines)
- [Code Style Guidelines](#code-style-guidelines)

## Code of Conduct

- Be respectful and constructive in all interactions
- Focus on what is best for the community
- Show empathy towards other community members
- Avoid destructive or unprofessional behavior

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Familiarity with React, TypeScript, TailwindCSS

### Setup
```bash
# Clone the repository
git clone git@github.com:VelcoreTech/velcoretech.com.git
cd velcoretech.com

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Development Workflow

1. **Create a branch** for your work (see [Branching Strategy](#branching-strategy))
2. **Make your changes** following our guidelines
3. **Test thoroughly** (see [Testing Requirements](#testing-requirements))
4. **Commit your changes** (see [Commit Message Guidelines](#commit-message-guidelines))
5. **Push to GitHub** and create a Pull Request
6. **Address review feedback** and make requested changes
7. **Merge when approved** by a maintainer

## Branching Strategy

We use a simplified Git flow:

### Main Branches
- **`main`** - Production-ready code. Only merged via Pull Requests.
- **`develop`** - Integration branch for features. Default for most development.

### Feature Branches
- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`refactor/*`** - Code refactoring
- **`docs/*`** - Documentation updates
- **`seo/*`** - SEO improvements
- **`style/*`** - Code style changes (formatting, etc.)

### Release Branches
- **`release/*`** - Preparation for production release

### Hotfix Branches
- **`hotfix/*`** - Emergency fixes for production

### Branch Naming Examples
```
feature/add-client-portal
fix/canonical-url-redirect
seo/optimise-page-titles
refactor/component-structure
docs/api-documentation
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **`feat`** - New feature
- **`fix`** - Bug fix
- **`docs`** - Documentation only changes
- **`style`** - Code style changes (formatting, etc.)
- **`refactor`** - Code refactoring
- **`perf`** - Performance improvements
- **`test`** - Adding or updating tests
- **`build`** - Build system or dependency changes
- **`ci`** - CI/CD configuration changes
- **`seo`** - SEO-related changes
- **`chore`** - Other changes

### Examples
```
feat(contact): add phone number validation

fix(seo): correct canonical URLs on service pages

docs(readme): update installation instructions

refactor(components): extract shared button logic

seo(meta): improve page titles and descriptions
```

## Pull Request Process

### Before Creating a PR
1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update changelog if applicable
5. Rebase your branch on the latest `main` or `develop`

### Creating a PR
1. Use our [PR Template](.github/PULL_REQUEST_TEMPLATE.md)
2. Fill in all required sections
3. Link to related issues using `Fixes #123` or `Closes #456`
4. Add appropriate labels: `bug`, `enhancement`, `documentation`, etc.
5. Request review from at least one maintainer

### PR Review Process
1. **Automated checks** must pass (CI/CD, tests, linting)
2. **Code review** by maintainers
3. **Testing verification** on staging if applicable
4. **Approval** required from at least one maintainer
5. **Squash and merge** preferred for clean history

### After Merge
1. Delete your branch if approved
2. Update related issues
3. Celebrate! 🎉

## Testing Requirements

### Required Testing
- **Unit tests** for new functions/components
- **Integration tests** for critical workflows
- **E2E tests** for user-facing features
- **Manual testing** for UI changes

### Test Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Testing Checklist
- [ ] New code has unit tests
- [ ] All existing tests still pass
- [ ] Manual testing completed
- [ ] Cross-browser testing performed (Chrome, Firefox, Safari)
- [ ] Mobile responsive testing completed
- [ ] Accessibility testing considered
- [ ] SEO impact evaluated

## SEO Guidelines

### SEO Requirements
- **Every page** must have:
  - Unique, descriptive `<title>` tag
  - Meta `<description>` tag
  - Proper `<link rel="canonical">` URL
  - Open Graph tags for social sharing
  - Schema.org JSON-LD markup where appropriate

### SEO Testing
```bash
# Check for missing meta tags
npm run test:seo

# Validate sitemap
curl https://velcoretech.com/sitemap.xml | xmllint --format -

# Check robots.txt
curl -I https://velcoretech.com/robots.txt
```

### SEO Commit Messages
Use `seo(<scope>):` prefix for SEO-related changes:
```
seo(home): improve meta description and title
seo(sitemap): add new service pages
seo(structured): add organization schema
```

## Code Style Guidelines

### TypeScript/React
- Use functional components with hooks
- Follow TypeScript best practices
- Use proper typing for props and state
- Prefer composition over inheritance

### TailwindCSS
- Use utility classes consistently
- Avoid inline styles
- Follow design system tokens
- Maintain responsive design patterns

### File Organization
```
src/
  components/
    ui/           # shadcn/ui components
    layout/       # layout components
    common/       # shared components
  pages/
    services/     # service pages
    city/         # local SEO pages
    legal/        # legal pages
  lib/           # utilities
  hooks/         # custom hooks
  types/         # TypeScript types
```

### Naming Conventions
- **Components**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Files**: kebab-case (`user-profile.tsx`, `api-client.ts`)
- **Functions**: camelCase (`getUserData()`, `handleSubmit()`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)

## Getting Help

- **Issues**: Use [GitHub Issues](https://github.com/VelcoreTech/velcoretech.com/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/VelcoreTech/velcoretech.com/discussions)
- **Security**: Report security issues privately to maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to VelcoreTech.com! 🚀
