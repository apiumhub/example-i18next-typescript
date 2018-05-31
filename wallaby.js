module.exports = wallaby => ({

    files: [

        {pattern:'src/**/*.ts', instrument: true },
        { pattern: '**/*.spec.ts', ignore: true }

    ],

    

    tests: [{pattern:'**/*.spec.ts', instrument: true }],

    

    compilers: {

        '**/*.ts': wallaby.compilers.typeScript({

            module: 1,  // commonjs

            target: 1,  // ES5

        })

    },

    

    testFramework: 'mocha',

    

    env: {

        type: 'node'

    },

    

    workers: {initial: 1, regular: 1},

    

    bootstrap: function (w) {

        require('reflect-metadata');

    }

});