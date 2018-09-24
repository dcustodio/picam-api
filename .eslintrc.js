module.exports = {
    "extends": "standard",
    rules: {
        indent: ['error', 4],
        'operator-linebreak': ['error', 'before'],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: 'return'
            },
            { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}
        ],
        'prefer-promise-reject-errors': ["error", {"allowEmptyReject": true}]
    },
    "plugins": ["jest"],
    env: {
        es6: true,
        jest: true
    }
};