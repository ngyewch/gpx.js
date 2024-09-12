import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
    jsdoc.configs['flat/recommended'],
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: {
            jsdoc,
        },
        rules: {
            'jsdoc/require-jsdoc': [
                'warn',
                {
                    publicOnly: true,
                    contexts: ["TSInterfaceDeclaration"],
                },
            ],
        },
    },
    {
        languageOptions: {
            globals: {...globals.browser, ...globals.node},
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
