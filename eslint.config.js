
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config(
  {
    ignores: ["**/*.js"],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
     rules:{
            'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
       'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
     }
  },
  perfectionist.configs["recommended-natural"],
);