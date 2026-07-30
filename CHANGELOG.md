# Changelog

All notable changes to velcoretech.com will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-30

### Added
- **Initial Production Release** - Complete website with React + TypeScript + Vite + TailwindCSS
- **Service Pages** - Managed IT, Cybersecurity, Consulting, AI Development, and more
- **Local SEO Architecture** - City hubs for Santa Cruz, Bay Area, and Monterey Bay
- **Contact Form** - With backend API and mail queue system
- **Assessment System** - IT & Security assessment intake form
- **Resources/Blog** - Technical content management system
- **Status Page** - System health monitoring
- **Case Studies** - Client engagement showcase
- **SEO Optimization** - Canonical URLs, meta tags, structured data
- **Responsive Design** - Mobile-first design with dark/light themes
- **GitHub Workflow** - Complete CI/CD, issue management, and PR process

### Fixed
- **Critical SEO Issues** (v1.0.0):
  - Fixed canonical URLs pointing to wrong pages
  - Removed duplicate brand names from page titles
  - Fixed typo "Excute" → "Execute"
  - Standardized URL case to lowercase
  - Updated all internal links and sitemap

### Security
- **Contact Form Protection** - Honeypot spam protection
- **Rate Limiting** - API endpoint rate limiting (20/15min)
- **Mail Queue** - Disk-backed queue with retry logic
- **Input Validation** - Zod schema validation

### Performance
- **Image Optimization** - WebP format with responsive loading
- **Code Splitting** - Lazy loading for routes and components
- **Build Optimization** - Vite production builds with tree-shaking
- **Asset Optimization** - Minified CSS and JS bundles

### Documentation
- **CONTRIBUTING.md** - Comprehensive contribution guidelines
- **REPOSITORY_SETUP.md** - GitHub workflow documentation
- **Issue Templates** - Bug reports and feature requests
- **PR Template** - With SEO and testing checklist
- **CI/CD Pipeline** - Automated testing and deployment

## [Unreleased]

### Planned
- Client portal for customer self-service
- Advanced analytics and tracking
- Performance monitoring dashboard
- Additional city expansions
- Enhanced security features

---

[1.0.0]: https://github.com/VelcoreTech/velcoretech.com/releases/tag/v1.0.0
