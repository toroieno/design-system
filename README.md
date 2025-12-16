# Pack Design System

A modern, customizable Vue 3 component library with TypeScript support and CSS custom properties for theming.

**⚠️ This is a licensed package. A valid license key is required for use.**

## Installation

### Step 1: Configure npm for GitHub Packages

Create `.npmrc` in your project root:

```
@your-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> Replace `YOUR_GITHUB_TOKEN` with a GitHub Personal Access Token that has `read:packages` scope.

### Step 2: Install the Package

```bash
npm install @your-username/design-system
```

### Step 3: Configure with License Key

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import DesignSystem from '@your-username/design-system'
import '@your-username/design-system/style.css'

const app = createApp(App)

app.use(DesignSystem, {
  licenseKey: 'pk_live_your_license_key_here'
})

app.mount('#app')
```

## Getting a License Key

Contact us to obtain a license key:
- Email: support@yourcompany.com
- Website: https://yourcompany.com/license

## Features

- 🚀 **Vue 3 + TypeScript** - Built with Composition API and full TypeScript support
- 🎨 **Custom Design Tokens** - Comprehensive CSS variables for theming
- 🌙 **Dark Mode Ready** - Built-in dark theme support
- ♿ **Accessible** - ARIA-compliant with keyboard navigation
- 📦 **Tree-shakable** - Import only what you need
- 🔒 **Licensed** - Protected distribution with license validation

## Components

### Form Controls
| Component | Description |
|-----------|-------------|
| `PkButton` | Versatile button with filled, outlined, text, and tonal variants |
| `AeInput` | Text input with outlined, filled, and underlined variants |
| `PkTextarea` | Multi-line text input with character count |
| `PkSelect` | Dropdown select with search and custom options |

### Selection Controls
| Component | Description |
|-----------|-------------|
| `AeCheckbox` | Checkbox with indeterminate state support |
| `PkRadio` | Radio button for single selection |
| `PkSwitch` | Toggle switch for boolean values |

### Display Components
| Component | Description |
|-----------|-------------|
| `PkCard` | Content container with multiple variants |
| `PkBadge` | Status indicators and labels |
| `PkAlert` | Contextual feedback messages |

## Usage Examples

### Button

```vue
<template>
  <PkButton variant="filled" color="primary">
    Click Me
  </PkButton>
</template>
```

### Input with Validation

```vue
<template>
  <AeInput 
    v-model="email"
    label="Email"
    type="email"
    :error-message="emailError"
  />
</template>
```

### Card with Actions

```vue
<template>
  <PkCard title="Welcome" variant="elevated">
    <p>Card content here</p>
    <template #actions>
      <PkButton variant="text">Cancel</PkButton>
      <PkButton>Confirm</PkButton>
    </template>
  </PkCard>
</template>
```

## Theming

Override CSS variables to customize the design:

```css
:root {
  --pk-primary-500: #your-brand-color;
  --pk-radius-lg: 16px;
  --pk-font-family: 'Your Font', sans-serif;
}
```

### Dark Mode

```html
<div data-theme="dark">
  <!-- Your app -->
</div>
```

---

# For Package Maintainers

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build:lib
```

## Generate License Keys

```bash
# Generate 1 live key
node scripts/generate-license.js

# Generate 5 keys
node scripts/generate-license.js 5

# Generate test keys
node scripts/generate-license.js 3 test
```

Add generated keys to `src/license.ts`:

```typescript
const VALID_LICENSE_KEYS = new Set<string>([
  'pk_live_xxxxxxxxxxxxx',
  'pk_live_yyyyyyyyyyyyy',
])
```

## Publishing private

### First-time Setup

1. Create GitHub Personal Access Token with `write:packages` scope
2. Login to GitHub Packages:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```

### Publish New Version

```bash
# Update version
npm version patch  # or minor, major

# Build and publish
npm run build:lib
npm publish
```

## Publishing public
```bash
npm logout
#npm login --auth-type=legacy
npm config set //registry.npmjs.org/:_authToken=npm_xxxxxxxxx
npm publish --access public
```

### CI/CD Auto-Publish

The GitHub Actions workflow automatically publishes when you:
1. Create a new Release on GitHub
2. Or manually trigger the workflow

## Granting Access to Users

1. **Via GitHub Repository Settings:**
   - Go to repo Settings → Packages → Package settings
   - Add users/teams under "Manage access"

2. **User Setup:**
   - User creates GitHub PAT with `read:packages`
   - User creates `.npmrc` with token
   - User runs `npm install @your-username/design-system`

## License

This software is proprietary. Unauthorized use, copying, or distribution is prohibited.
Contact support@yourcompany.com for licensing inquiries.
