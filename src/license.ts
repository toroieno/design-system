// Pack Design System - License Validation
// ============================================

// Store valid license keys (in production, validate against a server)
const VALID_LICENSE_KEYS = new Set<string>([
  // Add your valid license keys here
  // Example: 'pk_live_abc123xyz789'
])

// License state
let _isLicensed = false
let _licenseKey: string | null = null

/**
 * Validate a license key
 * @param key - The license key to validate
 * @returns boolean - Whether the key is valid
 */
export function validateLicenseKey(key: string): boolean {
  // Basic format validation
  if (!key || typeof key !== 'string') {
    return false
  }

  // Check if key matches expected format (pk_live_ or pk_test_ prefix)
  const validPrefixes = ['pk_live_', 'pk_test_']
  const hasValidPrefix = validPrefixes.some(prefix => key.startsWith(prefix))
  
  if (!hasValidPrefix) {
    console.warn('[PackDesignSystem] Invalid license key format')
    return false
  }

  // For development/testing, allow test keys
  if (key.startsWith('pk_test_') && import.meta.env?.DEV) {
    return true
  }

  // Check against valid keys list
  if (VALID_LICENSE_KEYS.has(key)) {
    return true
  }

  // Optional: Server-side validation (uncomment to enable)
  // return await validateWithServer(key)

  return false
}

/**
 * Set and validate the license
 * @param key - License key
 * @returns boolean - Whether validation succeeded
 */
export function setLicense(key: string): boolean {
  if (validateLicenseKey(key)) {
    _isLicensed = true
    _licenseKey = key
    return true
  }
  
  _isLicensed = false
  _licenseKey = null
  console.error(
    '[PackDesignSystem] Invalid license key. ' +
    'Please provide a valid license key to use this package. ' +
    'Contact support@yourcompany.com to obtain a license.'
  )
  return false
}

/**
 * Check if library is licensed
 */
export function isLicensed(): boolean {
  return _isLicensed
}

/**
 * Get current license key (masked)
 */
export function getLicenseInfo(): { valid: boolean; key: string | null } {
  return {
    valid: _isLicensed,
    key: _licenseKey ? `${_licenseKey.slice(0, 12)}...` : null
  }
}

/**
 * Require valid license (throws if not licensed)
 */
export function requireLicense(): void {
  if (!_isLicensed) {
    throw new Error(
      '[PackDesignSystem] This package requires a valid license. ' +
      'Please call app.use(PackDesignSystem, { licenseKey: "your_key" })'
    )
  }
}

/**
 * Add a license key to the valid keys set (for testing/admin purposes)
 * In production, this would be managed server-side
 */
export function addValidKey(key: string): void {
  VALID_LICENSE_KEYS.add(key)
}

/**
 * Generate a random license key (for admin use)
 */
export function generateLicenseKey(type: 'live' | 'test' = 'live'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `pk_${type}_${result}`
}

// Optional: Server-side validation
// async function validateWithServer(key: string): Promise<boolean> {
//   try {
//     const response = await fetch('https://api.yourcompany.com/validate-license', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ key })
//     })
//     const data = await response.json()
//     return data.valid === true
//   } catch (error) {
//     console.error('[PackDesignSystem] License validation failed:', error)
//     return false
//   }
// }

