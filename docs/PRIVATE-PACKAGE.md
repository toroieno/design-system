# Private Package Distribution Guide

This guide shows how to distribute your package privately with token-based authentication.

---

## Option 1: GitHub Packages (Recommended - Free for Private Repos)

### Step 1: Update package.json

```json
{
  "name": "@your-github-username/design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Step 2: Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `read:packages` (for users who install)
   - `write:packages` (for publishing)
   - `repo` (if private repository)
4. Copy the token

### Step 3: Publish to GitHub Packages

Create `.npmrc` in your project root:

```
@your-github-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then publish:

```bash
# Set token in environment
set GITHUB_TOKEN=ghp_your_token_here

# Publish
npm publish
```

### Step 4: Users Install with Token

Users must create `.npmrc` in their project:

```
@your-github-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_their_read_token
```

Then install:

```bash
npm install @your-github-username/design-system
```

---

## Option 2: Private npm Registry (npm Pro - $7/month)

### Step 1: Update package.json

```json
{
  "name": "@your-npm-org/design-system",
  "private": false,
  "publishConfig": {
    "access": "restricted"
  }
}
```

### Step 2: Publish

```bash
npm login
npm publish --access restricted
```

### Step 3: Grant Access to Users

```bash
# Add user to your org or grant read access
npm access grant read-only @your-npm-org/design-system username
```

### Step 4: Users Install

Users login to npm and install:

```bash
npm login
npm install @your-npm-org/design-system
```

---

## Option 3: Self-Hosted Private Registry (Verdaccio - Free)

### Step 1: Set Up Verdaccio Server

```bash
# Install globally
npm install -g verdaccio

# Run server
verdaccio
```

Server runs at `http://localhost:4873`

### Step 2: Configure Verdaccio Authentication

Edit `~/.config/verdaccio/config.yaml`:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    max_users: 100

packages:
  '@your-scope/*':
    access: $authenticated
    publish: $authenticated
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs

security:
  api:
    jwt:
      sign:
        expiresIn: 60d
```

### Step 3: Create Users

```bash
npm adduser --registry http://localhost:4873
```

### Step 4: Publish to Your Registry

```bash
npm publish --registry http://localhost:4873
```

### Step 5: Users Install with Token

Users create `.npmrc`:

```
@your-scope:registry=http://your-server:4873/
//your-server:4873/:_authToken=their_token_here
```

---

## Option 4: Token Validation in Code (Runtime Check)

If you want to add license key validation directly in your component library:

### Create License Validator

```typescript
// src/license.ts
const VALID_TOKENS = new Set([
  'pk_live_xxxxxxxxxxxx',
  'pk_live_yyyyyyyyyyyy',
  // Add more valid tokens
])

let isValidated = false

export function validateLicense(token: string): boolean {
  if (VALID_TOKENS.has(token)) {
    isValidated = true
    return true
  }
  console.error('[PackDesignSystem] Invalid license token')
  return false
}

export function checkLicense(): boolean {
  if (!isValidated) {
    console.warn('[PackDesignSystem] Please provide a valid license token')
    return false
  }
  return true
}
```

### Update Plugin Installation

```typescript
// src/index.ts
import type { App, Plugin } from 'vue'
import { validateLicense } from './license'

export interface PackOptions {
  licenseKey: string
}

const PackDesignSystem: Plugin = {
  install(app: App, options?: PackOptions) {
    if (!options?.licenseKey) {
      throw new Error('[PackDesignSystem] License key is required')
    }
    
    if (!validateLicense(options.licenseKey)) {
      throw new Error('[PackDesignSystem] Invalid license key')
    }
    
    // Register components...
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
}
```

### Usage with License Key

```typescript
// User's main.ts
import DesignSystem from 'design-system'

app.use(DesignSystem, {
  licenseKey: 'pk_live_xxxxxxxxxxxx'
})
```

---

## Recommended Setup: GitHub Packages + Runtime Validation

For maximum security, combine both approaches:

1. **GitHub Packages** - Controls who can download the package
2. **Runtime License Check** - Validates legitimate usage even if package leaks

This is similar to how commercial UI libraries like Syncfusion, AG Grid, etc. work.

