import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['dist', 'build', 'node_modules'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url),
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    rules: {
      // Stylistic Rules
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],

      // TypeScript Rules
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error', 
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],

      // Express/API specific
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  }
);

// import eslint from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import stylistic from '@stylistic/eslint-plugin';

// export default tseslint.config(
//   {
//     files: ['**/*.ts'],
//     ignores: ['dist', 'build'],
//     languageOptions: {
//       parserOptions: {
//         project: './tsconfig.json',
//         tsconfigRootDir: new URL('.', import.meta.url),
//       },
//     },
//     plugins: {
//       '@stylistic': stylistic,
//     },
//     rules: {
//       // Stylistic Rules
//       '@stylistic/semi': ['error', 'always'],
//       '@stylistic/indent': ['error', 2],
//       '@stylistic/quotes': ['error', 'single'],
//       '@stylistic/comma-dangle': ['error', 'only-multiline'],

//       // TypeScript Rules
//       '@typescript-eslint/no-unsafe-assignment': 'error',
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       '@typescript-eslint/restrict-template-expressions': 'off',
//       '@typescript-eslint/restrict-plus-operands': 'off',
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         { argsIgnorePattern: '^_' },
//       ],
//     },
//     extends: [
//       eslint.configs.recommended,
//       ...tseslint.configs.recommendedTypeChecked,
//     ],
//   }
// );