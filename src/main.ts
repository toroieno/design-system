import { createApp } from 'vue'
import App from './App.vue'
import PackDesignSystem, { addValidKey } from './index'

// For development: Add test license key
addValidKey('pk_test_demo_development_key')

const app = createApp(App)

// Install with license key
app.use(PackDesignSystem, {
  licenseKey: 'pk_test_demo_development_key'
})

app.mount('#app')

