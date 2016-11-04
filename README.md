# babel-plugin-test-unroll

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Version][version-badge]][package]
[![MIT License][license-badge]][LICENSE]

This is a Babel plugin (inspired by [Spock](http://spockframework.org/spock/docs/1.1-rc-2/data_driven_testing.html)) built to support [data driven testing](https://en.wikipedia.org/wiki/Data-driven_testing).

## Installation

1. `npm install --save-dev babel-plugin-test-unroll`
2. Update your `.babelrc` (or other form of configuring Babel plugins) to add `test-unroll`

## Usage

Write your tests as you normally would, but instead of duplicating tests, use an `unroll` block instead:

```js
it( "should sum #a and #b for a result of #expected", () => {
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})
```

This will be transformed into three distinct tests and is the equivalent of:

```js
it("should sum 1 and 4 for a result of 5", () => {
	const a = 1
	const b = 4
	const expected = 5

	expect( sum( a, b) ).toBe( expected );
})

it("should sum 2 and 5 for a result of 7", () => {
	const a = 2
	const b = 5
	const expected = 7

	expect( sum( a, b) ).toBe( expected );
})

it("should sum 3 and 6 for a result of 9", () => {
	const a = 3
	const b = 6
	const expected = 9

	expect( sum( a, b) ).toBe( expected );
})
```

There are two parts in each line of the `unroll` block:

1. The "labels" (`a`, `b`, and `expected` from the example above). These are used to declare the variables in the test as well as to populate the placeholders (designated by a `#` and the label in the test description).
2. The "value list" (`[1, 2, 3]`, `[4, 5, 6]`, and `[5, 7, 9]` from the example above). These values are "unrolled" to create each test. The first test gets the first set of values from each label, the second gets the second set, and so on. Each value list must have the same number of values.

The `unroll` block must be the last group of statements in the test *or* it must be wrapped in a block, like this:

```
it( "should sum #a and #b for a result of #expected", () => {
	unroll: {
		a = [ 1, 2, 3 ]
		b = [ 4, 5, 6 ]
		expected = [ 5, 7, 9 ]
	}

	expect( sum( a, b ) ).toBe( expected )
})

```

## FAQ

### Which testing frameworks are supported?

I've only tested with Jest, but (in theory) it should work with most popular testing frameworks. The plugin has a whitelist of test names and modifiers (`it`, `test`, `fit`, `it.only`, `test.only`, and `fit.only`) and will only unroll tests that use those methods. If there are more test names that should be supported, feel free to [open an issue](https://github.com/s992/babel-plugin-test-unroll/issues) or submit a PR.

### How can I use data tables like Spock?

I would love to support data tables (and may try to in the future), but I have to figure out a way to abuse the bitwise OR operator without running into syntax errors. For example, the following data table parses fine:

```js
unroll:
a | b  | expected
1 | {} | "whatever"
```

But this one doesn't:

```js
unroll:
a  | b | expected
{} | 1 | "whatever"
```

### Why don't I just put a loop around my tests and generate them like that?

There's nothing stopping you; It accomplishes the same thing. I prefer to keep my tests as free of non-test code as possible, but there's definitely nothing inherently wrong with generating tests yourself. :)

### Why is my linter exploding?

Using this will cause ESLint (not sure about other linters) to complain about `no-undef` and `no-unused-labels`. I'm actively researching ways to get this to lint, but in the meantime (if you're on ESLint), you can work around it by adding `/* eslint-disable no-undef, no-unused-labels */` as the first line of your data driven tests:

```js
it( "should sum #a and #b for a result of #expected", () => {
	/* eslint-disable no-undef, no-unused-labels */
	expect( sum( a, b ) ).toBe( expected )

	unroll:
	a = [ 1, 2, 3 ]
	b = [ 4, 5, 6 ]
	expected = [ 5, 7, 9 ]
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Please include tests (if relevant) and make sure it lints (`npm run lint`). Yes, I indent with tabs and am a monster.
4. Commit your changes: Please format your commit messages to follow the project's commit message [convention](https://github.com/conventional-changelog/conventional-changelog-angular/blob/ed32559941719a130bb0327f886d6a32a8cbc2ba/convention.md). You can use `commitizen` to help with this by running `npm run commit` and following the prompts.
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D

## License

[MIT][license]


[build]: https://travis-ci.org/s992/babel-plugin-test-unroll
[build-badge]: https://img.shields.io/travis/s992/babel-plugin-test-unroll.svg?style=flat-square
[coverage]: https://codecov.io/gh/s992/babel-plugin-test-unroll
[coverage-badge]: https://img.shields.io/codecov/c/github/s992/babel-plugin-test-unroll.svg?style=flat-square
[license]: https://github.com/s992/babel-plugin-test-unroll/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/s992/babel-plugin-test-unroll.svg?style=flat-square
[package]: https://www.npmjs.com/package/babel-plugin-test-unroll
[version-badge]: https://img.shields.io/npm/v/babel-plugin-test-unroll.svg
