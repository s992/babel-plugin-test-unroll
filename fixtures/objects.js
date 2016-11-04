it( "should set a.foo to #b for a result of #expected", () => {
	a.foo = b

	expect( a ).toEqual( expected )

	unroll:
	a =        [{ foo: 1 }, {}]
	b =        [ 2,          1          ]
	expected = [{ foo: 2 }, { foo: 1 }]
})
