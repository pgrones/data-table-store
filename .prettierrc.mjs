/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

const config = {
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  quoteProps: 'consistent',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '.*styles.css$',
    '.*style.css$',
    'dayjs',
    '^react$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^@/.*$',
    '^../(?!.*.css$).*$',
    '^./(?!.*.css$).*$',
    '\\.css$'
  ]
};

export default config;
