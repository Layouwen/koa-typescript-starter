import antfu from '@antfu/eslint-config';

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    stylistic: {
      indent: 2,
    },
    ignores: ['tsconfig.app.json'],
  },
  {
    rules: {
      'style/semi': ['error', 'always'],
      'style/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
);
