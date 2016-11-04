it( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll: {
		a = [ 1, 2, 3 ]
		b = [ 4, 5, 6 ]
		expected = [ 5, 7, 9 ]
	}

	// down here there's more stuff and it's ok
	const xyz = "hello"
})
