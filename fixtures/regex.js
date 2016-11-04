it( "should return #expected if #str matches #regex", () => {
	expect( match( a, b ) ).toBe( expected )

	unroll:
	regex =    [ /abc/i,    /\d+/           ]
	str =      [ "AbCdEfG", "i won't match" ]
	expected = [ true,      false           ]
})
