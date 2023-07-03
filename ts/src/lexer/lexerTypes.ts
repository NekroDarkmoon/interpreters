import createToken from "../utils/createToken";

export const TokenType = {
	Assign: '=',
	Asterisk: '*',
	Bang: '!',
	Comma: ',',
	Dash: '-',
	Eof: 'EOF',
	Else: 'else',
	Equal: '==',
	False: 'false',
	ForwardSlash: '/',
	Function: 'FUNCTION',
	GreaterThan: '>',
	Ident: 'IDENT',
	If: 'if',
	Illegal: 'ILLEGAL',
	Int: 'int',
	LessThan: '<',
	Let: 'LET',
	LBrace: '{',
	LParen: '(',
	Minus: '-',
	NotEqual: '!=',
	Plus: '+',
	Return: 'return',
	RBrace: '}',
	RParen: ')',
	Semicolon: ';',
	True: 'true',
} as const;

export type TokenItem = typeof TokenType[keyof typeof TokenType];

export interface Token {
	type: TokenItem;
	literal: string;
}

export const KEYWORDS = {
	'else': createToken(TokenType.Else, 'else'),
	'false': createToken(TokenType.False, 'false'),
	'fn': createToken(TokenType.Function, 'fn'),
	'if': createToken(TokenType.If, 'if'),
	'let': createToken(TokenType.Let, 'let'),
	'return': createToken(TokenType.Return, 'return'),
	'true': createToken(TokenType.True, 'true'),
}