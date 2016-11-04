it( "should concat #a and #b for a result of #expected", () => {
	expect( concat( a, b ) ).toBe( expected )

	unroll:
	a =        [[ 1, 2 ],       [ 1, 2 ]]
	b =        [[ 3, 4 ],       []]
	expected = [[ 1, 2, 3, 4 ], [ 1, 2 ]]
})
