module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts',
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--kro-primary)',
        background: 'var(--kro-background)',
        backgroundSecondary: 'var(--kro-background-secondary)',
        foreground: 'var(--kro-foreground)',
        foregroundSecondary: 'var(--kro-foreground-secondary)',
        divider: 'var(--kro-divider)',
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    applyComplexClasses: true,
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true,
  },

}
