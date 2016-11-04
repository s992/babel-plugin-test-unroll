it( () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})
