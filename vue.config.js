var path = require('path');

module.exports = {
    publicPath: './',
    pages: {
        index: {
            entry: 'src/app/main.js'
        }
    },
    configureWebpack: {
		resolve: {
			alias: {
				'assets': path.resolve(__dirname, 'src/assets')
			}
		}
	}
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `@import "~bulma/sass/utilities/_all"`
    //         }
    //     }
    // },
};