const airbnbBaseImports = require('eslint-config-airbnb-base/rules/imports');
const airbnbBaseStyle = require('eslint-config-airbnb-base/rules/style');

// Imports – handled by oxlint
// Styles – handled by oxfmt
// So we disabled them to avoid conflicts & speed up linting
const disabledRules = Object.keys({
  ...airbnbBaseImports.rules,
  ...airbnbBaseStyle.rules,
});

const initialRules = {
  ...Object.fromEntries(disabledRules.map((rule) => [rule, 'off'])),

  'class-methods-use-this': 'off',
  'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
  '@typescript-eslint/indent': 'off', // must be handled by oxfmt
};

const tsRules = {
  'typescript-sort-keys/interface': [
    'error',
    'asc',
    {
      caseSensitive: false,
      natural: false,
      requiredFirst: true,
    },
  ],
  '@typescript-eslint/no-unused-expressions': 'error',
  '@typescript-eslint/no-inferrable-types': 'off',
};

// Oxfmt will support it in the future
const paddingsRule = {
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: '*',
      next: ['return', 'if', 'export', 'function', 'while', 'try', 'throw', 'class'],
    },
    {
      blankLine: 'always',
      prev: ['if', 'function', 'while', 'export', 'throw', 'class'],
      next: '*',
    },
    { blankLine: 'any', prev: 'const', next: ['const', 'let'] },
    { blankLine: 'always', prev: 'const', next: '*' },
    { blankLine: 'any', prev: 'const', next: 'const' },
    {
      blankLine: 'always',
      prev: 'multiline-const',
      next: '*',
    },
    {
      blankLine: 'always',
      prev: '*',
      next: 'multiline-const',
    },
  ],
};

const namingConventionRegex = `^(_)`;

const namingConventionRule = {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'default',
      format: ['strictCamelCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['global'],
      types: ['number', 'string'],
      format: ['UPPER_CASE'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['destructured'],
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'variable',
      modifiers: ['exported'],
      format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'variable',
      types: ['function'],
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'function',
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'property',
      format: ['strictCamelCase', 'StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'enum',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'],
    },
    {
      selector: 'parameter',
      format: ['strictCamelCase'],
      leadingUnderscore: 'allow',
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'variable',
      types: ['boolean'],
      format: ['StrictPascalCase'],
      prefix: ['is', 'has', 'can', 'should'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'interface',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'typeLike',
      format: ['StrictPascalCase'],
      filter: {
        match: false,
        regex: namingConventionRegex,
      },
    },
    {
      selector: 'import',
      format: ['camelCase', 'PascalCase'],
    },
  ],
};

const oxlintHandledRules = {
  // Explicitly enabled in oxlint rules
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/require-await': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-redundant-type-constituents': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  '@typescript-eslint/no-unnecessary-type-constraint': 'off',
  '@typescript-eslint/no-unsafe-enum-comparison': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-unsafe-function-type': 'off',
  '@typescript-eslint/no-wrapper-object-types': 'off',
  '@typescript-eslint/no-restricted-types': 'off',
  '@typescript-eslint/restrict-plus-operands': 'off',
  '@typescript-eslint/return-await': 'off',
  '@typescript-eslint/no-useless-constructor': 'off',
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/no-shadow': 'off',
  '@typescript-eslint/dot-notation': 'off',
  'max-classes-per-file': 'off',
  'no-unused-labels': 'off',
  'no-unreachable': 'off',
  'no-unused-vars': 'off',
  'no-fallthrough': 'off',
  'no-void': 'off',
  'no-console': 'off',
  yoda: 'off',

  // Enabled by default in oxlint
  '@typescript-eslint/await-thenable': 'off',
  '@typescript-eslint/no-base-to-string': 'off',
  '@typescript-eslint/no-duplicate-enum-values': 'off',
  '@typescript-eslint/no-duplicate-type-constituents': 'off',
  '@typescript-eslint/no-extra-non-null-assertion': 'off',
  '@typescript-eslint/no-for-in-array': 'off',
  '@typescript-eslint/no-implied-eval': 'off',
  '@typescript-eslint/no-misused-new': 'off',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/no-unsafe-declaration-merging': 'off',
  '@typescript-eslint/prefer-as-const': 'off',
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/triple-slash-reference': 'off',
  '@typescript-eslint/no-array-delete': 'off',
  '@typescript-eslint/no-meaningless-void-operator': 'off',
  '@typescript-eslint/no-misused-spread': 'off',
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'off',
  '@typescript-eslint/no-unsafe-unary-minus': 'off',
  '@typescript-eslint/no-useless-empty-export': 'off',
  '@typescript-eslint/require-array-sort-compare': 'off',
  '@typescript-eslint/unbound-method': 'off',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2023,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-typescript-sort-keys'],
  extends: [
    'airbnb/base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    ...initialRules,
    ...oxlintHandledRules,
    ...tsRules,
    ...paddingsRule,
    ...namingConventionRule,
  },
  overrides: [
    {
      files: ['**/*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        'typescript-sort-keys/interface': 'off',
      },
    },
    {
      files: ['jest.config.ts', 'packages/*/jest.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['**/index.ts'],
      rules: {
        'padding-line-between-statements': 'off',
      },
    },
    {
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-new': 'off',
      },
    },
    {
      files: ['**/decorators/**/index.ts'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
