import util from "util"

export default function prettyPrint( t, expression ) {
	if( t.isArrayExpression( expression ) ) {
		return inspect( arrayExpressionToArray( t, expression ) )
	}

	if( t.isObjectExpression( expression ) ) {
		return inspect( objectExpressionToObject( t, expression ) )
	}

	if( t.isFunctionExpression( expression ) || t.isArrowFunctionExpression( expression ) ) {
		return `[function: ${expression.id ? expression.id.name : "anonymous"}]`
	}

	if( t.isRegExpLiteral( expression ) ) {
		return regExpExpressionToString( expression )
	}

	if( t.isIdentifier( expression ) ) {
		return expression.name
	}

	if( t.isNullLiteral( expression ) ) {
		return null
	}

	if( t.isBooleanLiteral( expression ) ) {
		return expression.value
	}

	if( t.isStringLiteral( expression ) ) {
		return `'${expression.value}'`
	}

	return expression.value || expression
}

function inspect( value ) {
	return util.inspect( value, { breakLength: Infinity, depth: null })
}

function arrayExpressionToArray( t, expression ) {
	return expression.elements.map( el => prettyPrint( t, el ) )
}

function objectExpressionToObject( t, expression ) {
	return expression.properties.reduce( ( obj, prop ) => {
		obj[ prop.key.name ] = prettyPrint( t, prop.value )

		return obj
	}, {})
}

function regExpExpressionToString( expression ) {
	return expression.extra.raw || `/${expression.pattern}/${expression.flags}`
}
