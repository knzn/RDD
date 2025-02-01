export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      backdropBlur: {
        lg: '20px', // Ensure backdrop blur is enabled
      },
      backgroundOpacity: {
        70: '0.7', // Ensure opacity is enabled
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), // Add the plugin
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
};