<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/styles/themes/cyan/index.css'
import '@/styles/themes/red/index.css'
import '@/styles/themes/blue/index.css'
import '@/styles/themes/white/index.css'
import '@/styles/themes/black/index.css'
const defaultSettings = require('./settings.js')
export default {
  name: 'App',
  created() {
    const defaultTheme = defaultSettings.prefix + 'Theme'
    const defaultThemeColor = defaultSettings.prefix + 'ThemeColor'
    const theme = localStorage.getItem(defaultTheme) ? localStorage.getItem(defaultTheme) : 'cyan'
    this.$store.dispatch('app/toggleTheme', theme)
    const themeColor = localStorage.getItem(defaultThemeColor) ? localStorage.getItem(defaultThemeColor) : '#169688'
    this.$store.dispatch('app/toggleThemeColor', themeColor)
    this.$common.toggleClass(document.body, `${defaultSettings.prefix}-${theme}`)
  }
}
</script>
