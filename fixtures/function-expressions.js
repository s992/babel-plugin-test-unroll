it( "should execute #fn for a result of #something", () => {
	expect( fn() ).toBe( something )

	unroll:
	fn = [ () => {}, function test() {} ]
	something = [ "something", "something else" ]
})
