it( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})

test( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})

it.only( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})

test.only( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})

fit( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})

// this is probably nonsensical since fit === it.only.. right?
fit.only( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})
