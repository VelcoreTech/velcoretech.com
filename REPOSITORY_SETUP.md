# VelcoreTech.com - GitHub Repository Setup Guide

This guide explains the GitHub repository structure, branching strategy, and workflows for velcoretech.com.

## Repository Overview

**Repository**: `VelcoreTech/velcoretech.com`
**Description**: Official Velcore Tech website - React + TypeScript + Vite + TailwindCSS
**License**: Proprietary (internal use)

## Quick Start

### 1. Clone the Repository
```bash
git clone git@github.com:VelcoreTech/velcoretech.com.git
cd velcoretech.com
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Deploy to Production
```bash
make deploy
```

## Branching Strategy

We use a simplified Git Flow with these main branches:

```
main                    # Production-ready code (protected)
  ↑
  │  (merge)
  │
develop                 # Integration branch (default for PRs)
  ↑
  │  (merge)
  │
feature/*               # Feature branches
fix/*                   # Bug fix branches  
refactor/*              # Refactoring branches
seo/*                   # SEO improvement branches
docs/*                  # Documentation branches
```

### Branch Protection Rules
- **`main`** branch is protected
- Requires at least 1 approval
- Requires status checks to pass
- No direct pushes allowed
- Force pushes disabled

## Workflow Examples

### Feature Development
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-new-service-page

# 3. Make changes and commit
git add .
git commit -m "feat(services): add cloud migration service page"

# 4. Push and create PR
git push origin feature/add-new-service-page
# Create PR on GitHub: develop <- feature/add-new-service-page

# 5. After merge, delete branch
git checkout develop
git pull origin develop
git branch -d feature/add-new-service-page
```

### Bug Fix
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create fix branch
git checkout -b fix/canonical-url-redirect

# 3. Make changes and commit
git add .
git commit -m "fix(seo): correct canonical URL on contact page"

# 4. Push and create PR
git push origin fix/canonical-url-redirect
# Create PR on GitHub: main <- fix/canonical-url-redirect (hotfix)

# 5. After merge, delete branch
git checkout main
git pull origin main
git branch -d fix/canonical-url-redirect
```

### SEO Improvement
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create SEO branch
git checkout -b seo/optimize-service-page-titles

# 3. Make changes and commit
git add .
git commit -m "seo(services): improve page titles and meta descriptions"

# 4. Push and create PR
git push origin seo/optimize-service-page-titles
# Create PR on GitHub: main <- seo/optimize-service-page-titles

# 5. After merge, delete branch
git checkout main
git pull origin main
git branch -d seo/optimize-service-page-titles
```

## Release Management

### Version Tagging
We use semantic versioning for releases: `v1.0.0`, `v1.1.0`, `v1.0.1`

#### Major Release (Breaking Changes)
```bash
# Tag release
git tag -a v2.0.0 -m "Major release: new navigation and design system"

# Push tag
git push origin v2.0.0
```

#### Minor Release (New Features)
```bash
# Tag release
git tag -a v1.1.0 -m "Minor release: added client portal and blog"

# Push tag
git push origin v1.1.0
```

#### Patch Release (Bug Fixes)
```bash
# Tag release
git tag -a v1.0.1 -m "Patch release: fixed canonical URL issues"

# Push tag
git push origin v1.0.1
```

### Release Process

#### Preparation
1. **Create release branch**
```bash
git checkout main
git pull origin main
git checkout -b release/v1.1.0
```

2. **Update version numbers**
```bash
# Update package.json
npm version 1.1.0
```

3. **Update CHANGELOG.md**
```bash
# Add release notes
```

4. **Test thoroughly**
```bash
npm run build
npm test
# Manual testing
```

#### Release
1. **Merge to main**
```bash
git checkout main
git merge release/v1.1.0
```

2. **Tag the release**
```bash
git tag -a v1.1.0 -m "Release v1.1.0: added client portal"
```

3. **Push to GitHub**
```bash
git push origin main
git push origin v1.1.0
```

4. **Deploy to production**
```bash
make deploy
```

5. **Clean up**
```bash
git branch -d release/v1.1.0
```

## Issue Management

### Issue Labels
- **`bug`** - Bug reports
- **`enhancement`** - Feature requests
- **`documentation`** - Documentation issues
- **`seo`** - SEO-related issues
- **`performance`** - Performance issues
- **`accessibility`** - Accessibility issues
- **`security`** - Security issues
- **`triage`** - Needs triage
- **`in progress`** - Currently being worked on
- **`review`** - Under review
- **`done`** - Completed

### Issue Templates

We provide templates for:
- **Bug Report** - Report issues found on the site
- **Feature Request** - Suggest new features
- **SEO Issue** - Report SEO problems

Use the appropriate template when creating issues.

## Pull Request Process

### Before Creating a PR
1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run tests** and ensure they pass
4. **Check linting** - `npm run lint`
5. **Build successfully** - `npm run build`
6. **Update CHANGELOG.md** if applicable
7. **Rebase** your branch on latest main/develop

### Creating a PR
1. **Go to GitHub** and click "New Pull Request"
2. **Use our PR template** - it guides you through required information
3. **Fill in all sections**:
   - Type of change
   - Description
   - Related issues (use `Fixes #123`)
   - Testing completed
   - SEO impact (if applicable)
   - Deployment notes
4. **Add appropriate labels**: `bug`, `enhancement`, `documentation`, `seo`, etc.
5. **Request review** from at least one maintainer

### PR Review Guidelines

#### For Reviewers
- **Check code quality** and style
- **Verify functionality** matches description
- **Ensure tests** are adequate
- **Check SEO impact** for content changes
- **Verify accessibility** for UI changes
- **Test in browser** if applicable
- **Provide constructive feedback**

#### For Authors
- **Address all review comments**
- **Make requested changes**
- **Respond to questions**
- **Update documentation** if needed
- **Re-request review** when changes are complete

### Merging PRs
- **All checks must pass** (CI/CD, tests, linting)
- **At least one approval** required
- **Squash and merge** preferred for clean history
- **Delete branch** after merge (if approved)
- **Update related issues** with fix/close comments

## Continuous Integration

### GitHub Actions Workflows

We use GitHub Actions for CI/CD:

1. **CI Pipeline** - Runs on every push and PR
   - Linting
   - Type checking
   - Unit tests
   - Build verification

2. **Deploy Pipeline** - Runs on merge to main
   - Build production bundle
   - Deploy to staging/production
   - Run smoke tests

### Status Checks
Before a PR can be merged, these must pass:
- ✅ Lint check
- ✅ Type check
- ✅ Unit tests
- ✅ Build check

## Deployment Workflow

### Development Deployment
```bash
# Local development
npm run dev

# Preview deployment (if available)
npm run preview
```

### Production Deployment
```bash
# Using Makefile
make deploy

# Manual deployment
npm run build
# rsync to server
# promote release
```

### Deployment Safety
- **Never deploy directly** from feature branches
- **Always deploy from main** branch
- **Test thoroughly** before production deployment
- **Monitor logs** after deployment
- **Have rollback plan** ready

## Git Configuration

### Required Git Config
```bash
git config user.name "Your Name"
git config user.email "your.email@velcoretech.com"
```

### Aliases (Optional)
```bash
# Useful git aliases
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.st status
git config alias.unstage 'reset HEAD --'
git config alias.last 'log -1 HEAD'
git config alias.visual '!gitk'
```

## Troubleshooting

### Common Issues

#### Merge Conflicts
```bash
# Rebase your branch
git checkout your-branch
git rebase main

# Resolve conflicts
git add resolved/files
git rebase --continue
```

#### Force Push (Use with Caution!)
```bash
# Only for your own branches
git push origin your-branch --force

# NEVER force push to main!
```

#### Large Files
```bash
# Check for large files
git rev-list --objects --all |
git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
awk '/^blob/ {print substr($0,6)}' |
sort -nk2 | tail -n 10
```

## Best Practices

### Commit Frequently
- Small, focused commits
- Clear commit messages
- Don't mix unrelated changes

### Keep Branches Short-Lived
- Merge PRs promptly
- Delete merged branches
- Avoid long-running branches

### Write Good Commit Messages
- Use conventional commit format
- Be descriptive but concise
- Reference related issues

### Test Before Pushing
- Run tests locally
- Check build succeeds
- Manual testing for UI changes

### Communicate Proactively
- Update PRs with progress
- Ask for help when stuck
- Share knowledge with team

## Resources

### Documentation
- [Project README](README.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CHANGELOG.md](CHANGELOG.md)

### External Resources
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

### Team Communication
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Pull Requests**: For code reviews and collaboration

---

For questions or issues, please open a GitHub Issue or Discussion.
