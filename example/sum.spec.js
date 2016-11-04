import { sum } from "./math"

describe( "sum", () => {
	it( "should sum #a and #b for a result of #expected", () => {
		/* eslint-disable no-undef, no-unused-labels */
		expect( sum( a, b ) ).toBe( expected )

		unroll:
		a = [ 1, 2, 3 ]
		b = [ 4, 5, 6 ]
		expected = [ 5, 7, 9 ]
	})
})
