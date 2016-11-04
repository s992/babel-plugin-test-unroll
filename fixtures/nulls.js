it( "should return #expected for a value equal to #value", () => {
	expect( isNull( variable ) ).toBe( true )

	unroll:
	value = [ "not null", null ]
	expected = [ false, true ]
})
