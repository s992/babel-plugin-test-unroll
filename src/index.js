import { cloneDeep } from "lodash"
import prettyPrint from "./pretty-print"

const TEST_NAMES = [
	"it",
	"test",
	"fit",
]

const TEST_MODIFIERS = [
	"only",
]

export default function({ types: t }) {
	function getMappedValues( statements ) {
		const labels = statements.map( stmt => stmt.left.name )
		const values = statements.map( stmt => stmt.right.elements )
		const numberOfTests = values[ 0 ].length

		if( !values.every( v => v.length === numberOfTests ) ) {
			throw new Error( "Each value list must have the same number of values." )
		}

		const mappedValues = []

		for( let i = 0; i < numberOfTests; i++ ) {
			mappedValues.push(
				labels.map( ( label, idx ) => ({ label, value: values[ idx ][ i ] }) )
			)
		}

		return mappedValues
	}

	function isTest( path ) {
		if( !t.isCallExpression( path.node ) || !path.node.callee ) {
			return false
		}

		// support for stuff like `it.only("whatever", () => {})`
		if( t.isMemberExpression( path.node.callee ) ) {
			return TEST_NAMES.indexOf( path.node.callee.object.name ) !== -1 &&
					TEST_MODIFIERS.indexOf( path.node.callee.property.name ) !== -1
		}

		return TEST_NAMES.indexOf( path.node.callee.name ) !== -1
	}

	function getUnrollStatements( path ) {
		return t.isBlockStatement( path.node.body ) ? getUnrollStatementsWithBlock( path ) : getUnrollStatementsWithoutBlock( path )
	}

	function getUnrollStatementsWithBlock( path ) {
		return path.node.body.body.map( stmt => stmt.expression )
	}

	function getUnrollStatementsWithoutBlock( path ) {
		const parentBody = path.parentPath.node.body
		const unrollIdx = parentBody.indexOf( path.node )

		// grab the unroll label + all the lines following it
		const lines = parentBody.slice( unrollIdx, parentBody.length )

		// the first line gets wrapped up with the unroll label, so pop it out
		const firstLine = lines[ 0 ].body.expression

		// the rest of them are standalone statements so we can just grab their expressions
		const restLines = lines.slice( 1, lines.length ).map( stmt => stmt.expression )

		return [ firstLine, ...restLines ]
	}

	const testVisitor = {
		"ArrowFunctionExpression|FunctionExpression"( path ) {
			if( path.parentPath.node.isUnrolled ) {
				path.setData( "needsUnrollDeclarations", true )
			}
		},
		BlockStatement( path ) {
			if( !path.parentPath.getData( "needsUnrollDeclarations" ) ) {
				return
			}

			const declarations = this.mappedValues.map( ({ label, value }) =>
				t.variableDeclarator(
					t.identifier( label ),
					value
				)
			)

			path.node.body.unshift(
				t.variableDeclaration( "const", declarations )
			)
		},
		StringLiteral( path ) {
			if( !isTest( path.parentPath ) ) {
				return
			}

			path.node.value = path.node.value.replace( /#(\w+)/g, ( match, group ) => {
				const matchingValue = this.mappedValues.find( it => it.label === group )

				if( matchingValue ) {
					return prettyPrint( t, matchingValue.value )
				}

				return match
			})
		},
	}

	return {
		visitor: {
			CallExpression( path ) {
				if( !path.node.isUnrolled ) {
					return
				}

				path.traverse( testVisitor, { mappedValues: path.node.mappedValues })
			},
			LabeledStatement( path ) {
				if( path.node.label.name !== "unroll" ) {
					return
				}

				const testExpression = path.findParent( isTest )

				if( !testExpression ) {
					return
				}

				const unrollBlock = getUnrollStatements( path )
				const mappedValues = getMappedValues( unrollBlock )

				if( !t.isBlockStatement( path.node.body ) ) {
					let toRemove = path

					while( toRemove.node ) {
						toRemove.remove()
						toRemove = path.getSibling( path.key + 1 )
					}
				} else {
					path.remove()
				}

				const replacements = mappedValues.map( valueList => {
					const replacement = cloneDeep( testExpression.node )

					replacement.mappedValues = valueList
					replacement.isUnrolled = true

					return t.expressionStatement( replacement )
				})

				testExpression.replaceWithMultiple( replacements )
			},
		},
	}
}
