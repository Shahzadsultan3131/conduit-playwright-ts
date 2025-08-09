# Conduit Playwright TypeScript Framework

This repository contains a Playwright + TypeScript test automation framework for:
https://conduit.bondaracademy.com/

## Features
- Page Object Model (POM)
- API helpers to create test data
- Reusable authenticated session (storageState.json)
- Tests for Create/Edit/Delete Article, Filter by Tag, Update Settings
- Cross-browser (Chromium, Firefox, WebKit)
- Parallel execution and traces/screenshots on failure
- HTML report (playwright-report)

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Authenticate once to generate `storageState.json` (example flow):
```bash
# run a single test in headed mode or create storageState via a small script
npx playwright test tests/e2e/auth-setup.spec.ts --headed
```

3. Run tests:
```bash
npm test
```

4. Open report:
```bash
npm run test:report
```

CI: A GitHub Actions workflow is included at `.github/workflows/ci.yml`.
