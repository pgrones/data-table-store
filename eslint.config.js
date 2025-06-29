import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import youMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-you-might-not-need-an-effect': youMightNotNeedAnEffect
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',
      'react-you-might-not-need-an-effect/you-might-not-need-an-effect': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      // TypeScript ESLint specific rules
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true }
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        { allowNumberAndString: true }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  },
  {
    // ESLint specific rules
    // https://eslint.org/docs/latest/rules/
    rules: {
      'semi': 'error',
      'eqeqeq': 'error',
      'comma-dangle': 'error',
      'default-case': 'off',
      'default-case-last': 'error',
      'dot-notation': 'error',
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'yoda': 'error',
      'array-callback-return': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-has-own': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-object-spread': 'error',
      'no-undef': 'off',
      'no-var': 'error',
      'no-alert': 'error',
      'no-console': 'error',
      'no-eval': 'error',
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-call': 'error',
      'no-useless-constructor': 'error',
      'no-useless-return': 'error'
    }
  },
  {
    // React specific rules
    // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file
    plugins: { react },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-fragments': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-children-prop': 'error',
      'react/no-deprecated': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-string-refs': 'error',
      'react/self-closing-comp': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off'
    }
  },
  {
    // JSX A11y specific rules
    rules: {
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/anchor-has-content': 'off'
    }
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['**/lib/**/*', '**/lib']
        }
      ]
    }
  }
);
