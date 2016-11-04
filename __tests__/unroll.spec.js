import fs from "fs"
import { transform } from "babel-core"

import unroll from "../src"

describe( "babel-plugin-unroll", () => {
	it( "should unroll #testFile, resulting in #expectation", done => {
		/* eslint-disable no-undef, no-unused-labels, no-label-var */
		fs.readFile( `./fixtures/${testFile}.js`, ( err, data ) => {
			if( err ) {
				throw err
			}

			const src = data.toString()
			const { code } = transform( src, { plugins: [unroll] })

			expect( code ).toMatchSnapshot()
			done()
		})

		unroll:
		testFile = [
			"basic",
			"arrays",
			"objects",
			"regex",
			"no-unroll",
			"labels",
			"no-test",
			"test-names",
			"no-description",
			"function-expressions",
			"identifiers",
			"nulls",
			"unroll-block",
		]
		expectation = [
			"three tests",
			"two tests, rendering arrays properly in the test description",
			"two tests, rendering objects properly in the test description",
			"two tests, rendering regex literals properly in the test description",
			"one test, unaltered because there is no unroll label",
			"one test, unaltered because there is no unroll label",
			"no changes, because it's not a test",
			"18 tests, three for each supported test name (it, it.only, test, test.only, fit, fit.only)",
			"three tests with no issues due to not having a description",
			"two tests that have no problem rendering function expressions in the description",
			"three tests that have no problem rendering identifiers in the description",
			"two tests that have no problem rendering null in the description",
			"three tests, making sure to only remove the unroll block",
		]
	})

	it( "should throw an error if an unroll block has a mismatched number of values", () => {
		const src = `
			test(() => {
				unroll:
				a = [ 1, 2, 3 ]
				b = [ 1, 2 ]
			})
		`

		expect( () =>
			transform( src, { plugins: [unroll] })
		).toThrow( "Each value list must have the same number of values." )
	})

	it( "should not have any problems unrolling a test with extra hashes in the description", () => {
		const src = `
			test("#a and #b and #c", () => {
				unroll:
				a = [ 1 ]
				b = [ 2 ]
			})
		`
		const { code } = transform( src, { plugins: [unroll] })

		expect( code ).toMatch( /1 and 2 and #c/ )
	})
})
