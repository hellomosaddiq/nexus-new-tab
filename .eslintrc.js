module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script' // Browser extensions often use script mode
  },
  globals: {
    // Browser extension APIs
    chrome: 'readonly',
    browser: 'readonly',
    
    // Global variables from your extension
    Nexus: 'readonly',
    QuickShortcuts: 'readonly',
    NexusCacheManager: 'readonly',
    NotificationSystem: 'readonly',
    TabMemorySystem: 'readonly'
  },
  rules: {
    // Error prevention (relaxed for existing codebase)
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-console': 'off', // Allow console for debugging in extension
    'no-debugger': 'warn',
    'no-alert': 'warn',

    // Code quality (relaxed for existing code)
    'prefer-const': 'warn', // Warn instead of error
    'no-var': 'warn', // Warn instead of error
    'eqeqeq': 'off', // Disable for existing code
    'curly': 'off', // Disable for existing code style

    // Style (handled by Prettier, but some logical rules)
    'no-multiple-empty-lines': ['error', { max: 3 }],
    'no-trailing-spaces': 'off', // Let Prettier handle this

    // Browser extension specific
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',

    // Disable problematic rules for existing codebase
    'no-redeclare': 'off', // Classes are intentionally global
    'no-case-declarations': 'off', // Allow case declarations
    'no-dupe-keys': 'warn' // Warn instead of error
  },
  overrides: [
    {
      // More relaxed rules for background scripts
      files: ['src/background/**/*.js'],
      globals: {
        'importScripts': 'readonly'
      },
      rules: {
        'no-console': 'off', // Background scripts often need console for debugging
        'no-unused-vars': 'off' // Event handlers often have unused parameters
      }
    },
    {
      // Very relaxed rules for browser polyfill (third-party code)
      files: ['src/lib/browser-polyfill.js'],
      rules: {
        'eqeqeq': 'off',
        'curly': 'off',
        'no-var': 'off',
        'prefer-const': 'off',
        'no-undef': 'off',
        'no-console': 'off'
      }
    },
    {
      // Specific rules for content scripts if you add them
      files: ['src/content/**/*.js'],
      env: {
        browser: true,
        webextensions: false // Content scripts don't have full extension APIs
      }
    }
  ]
};
