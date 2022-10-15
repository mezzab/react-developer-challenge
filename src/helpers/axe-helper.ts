import { configureAxe } from 'jest-axe'

const axe = configureAxe({
  rules: {
    // Disabling the region rule, as were testing just a component, and not an entire HTML page
    // https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
    region: { enabled: false },
    'color-contrast': { enabled: false },
  },
})

export default axe
