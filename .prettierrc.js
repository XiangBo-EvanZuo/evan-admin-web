module.exports = {
    printWidth: 100,
    semi: true,
    vueIndentScriptAndStyle: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'auto',
    plugins: ['prettier-plugin-packagejson'],
    overrides: [
        {
            files: '.*rc',
            options: {
                parser: 'json',
            },
        },
    ],
};
