/**
* This file exists so that I can use the unroll plugin to write tests for unroll without going through a
* compile process prior to each test run. This gets included as a plugin our .babelrc, which means the
* only way (that I can find!) to compile the plugin on the fly is via babel-register.
*/

require( "babel-register" )({
	only: /src/,
})

module.exports = require( "./src" )
