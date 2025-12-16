#!/usr/bin/env node

/**
 * License Key Generator for Pack Design System
 * 
 * Usage:
 *   node scripts/generate-license.js [count] [type]
 * 
 * Examples:
 *   node scripts/generate-license.js         # Generate 1 live key
 *   node scripts/generate-license.js 5       # Generate 5 live keys
 *   node scripts/generate-license.js 3 test  # Generate 3 test keys
 */

function generateLicenseKey(type = 'live') {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `pk_${type}_${result}`
}

// Parse arguments
const count = parseInt(process.argv[2]) || 1
const type = process.argv[3] || 'live'

console.log(`\n🔑 Generating ${count} ${type} license key(s):\n`)
console.log('─'.repeat(50))

const keys = []
for (let i = 0; i < count; i++) {
  const key = generateLicenseKey(type)
  keys.push(key)
  console.log(`  ${key}`)
}

console.log('─'.repeat(50))
console.log(`\n📋 Copy these keys to src/license.ts:\n`)
console.log('const VALID_LICENSE_KEYS = new Set<string>([')
keys.forEach(key => {
  console.log(`  '${key}',`)
})
console.log('])\n')

console.log('✅ Done!\n')

