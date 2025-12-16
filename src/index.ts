// Pack Design System - Library Entry Point
// ============================================

import type { App, Plugin } from 'vue'

// Import license validation
import { setLicense, isLicensed, addValidKey, generateLicenseKey } from './license'

// Import styles
import './styles/main.scss'

// Import all components
import { AeButton } from './components/AeButton'
import { AeProgressBar } from './components/AeProgressBar'
import { AeInput } from './components/AeInput'
import { PkTextarea } from './components/PkTextarea'
import { PkSelect } from './components/PkSelect'
import { AeCheckbox } from './components/AeCheckbox'
import { PkRadio } from './components/PkRadio'
import { PkSwitch } from './components/PkSwitch'
import { PkCard } from './components/PkCard'
import { PkBadge } from './components/PkBadge'
import { PkAlert } from './components/PkAlert'

// Export individual components
export {
  AeButton,
  AeProgressBar,
  AeInput,
  PkTextarea,
  PkSelect,
  AeCheckbox,
  PkRadio,
  PkSwitch,
  PkCard,
  PkBadge,
  PkAlert,
}

// Export types
export type { AeButtonProps } from './components/AeButton'
export type { AeProgressBarProps } from './components/AeProgressBar'
export type { AeInputProps } from './components/AeInput'
export type { PkTextareaProps } from './components/PkTextarea'
export type { PkSelectProps, SelectOption } from './components/PkSelect'
export type { AeCheckboxProps } from './components/AeCheckbox'
export type { PkRadioProps } from './components/PkRadio'
export type { PkSwitchProps } from './components/PkSwitch'
export type { PkCardProps } from './components/PkCard'
export type { PkBadgeProps } from './components/PkBadge'
export type { PkAlertProps } from './components/PkAlert'

// Export license utilities (for admin purposes)
export { isLicensed, addValidKey, generateLicenseKey }

// Plugin options interface
export interface PackDesignSystemOptions {
  /**
   * Your license key for Pack Design System
   * Obtain a key at: https://yourcompany.com/license
   */
  licenseKey: string
}

// Component list for global registration
const components = {
  AeButton,
  AeProgressBar,
  AeInput,
  PkTextarea,
  PkSelect,
  AeCheckbox,
  PkRadio,
  PkSwitch,
  PkCard,
  PkBadge,
  PkAlert,
}

// Vue Plugin for global component registration
const PackDesignSystem: Plugin = {
  install(app: App, options?: PackDesignSystemOptions) {
    // Validate license key
    if (!options?.licenseKey) {
      console.error(
        '[PackDesignSystem] License key is required!\n\n' +
        'Usage:\n' +
        '  import PackDesignSystem from "design-system"\n' +
        '  import "design-system/style.css"\n\n' +
        '  app.use(PackDesignSystem, {\n' +
        '    licenseKey: "pk_live_your_license_key"\n' +
        '  })\n\n' +
        'Get your license at: https://yourcompany.com/license'
      )
      throw new Error('[PackDesignSystem] Missing license key')
    }

    // Validate the license
    const isValid = setLicense(options.licenseKey)

    if (!isValid) {
      throw new Error('[PackDesignSystem] Invalid license key')
    }

    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })

    // Provide license status to components (optional)
    app.provide('packLicensed', true)

    console.log('[PackDesignSystem] ✓ License validated successfully')
  },
}

export default PackDesignSystem
