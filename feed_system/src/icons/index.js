import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
// import generateIconsView from '@/views/svg-icons/generateIconsView.js'// just for @/views/icons , you can delete it

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

// generateIconsView.generate(iconMap) // just for @/views/icons , you can delete it
