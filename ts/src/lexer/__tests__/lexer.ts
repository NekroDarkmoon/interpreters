import Lexer from "../index"

import { TokenType } from "../lexerTypes";
import createToken from "../../utils/createToken";

// test('test nextToken()', function() {
// 	const input = `+-*=(){},;`

// 	const testTokens = [
// 		TokenType.Plus,
// 		TokenType.Minus,
// 		TokenType.Asterisk,
// 		TokenType.Assign,
// 		TokenType.LParen,
// 		TokenType.RParen,
// 		TokenType.LBrace,
// 		TokenType.RBrace,
// 		TokenType.Comma,
// 		TokenType.Semicolon,
// 	]

// 	const lexer = new Lexer(input);
// 	for (const tok of testTokens) {
// 		const token = lexer.nextToken();
// 		expect(token.type).toBe(tok);
// 	}
// }); 


test('test nextToken() full test', function() {
	const input = `let add = fn(x, y) { x + y; }
		let valueA = 10;
		let valueB = 20;
		let valueC = 10;
		
		let result = add(valueA, valueB);

		if ( valueA < valueB ) { return true; }
		else if ( valueA > valueB ) { return false; }
		else if ( valueA == valueC ) { return true; }
		else if ( valueA != valueC ) { return false; }
		else { return false; }
	`

	const testTokens = [
		createToken(TokenType.Let, 'let'),
		createToken(TokenType.Ident, 'add'),
		createToken(TokenType.Assign, '='),
		createToken(TokenType.Function, 'fn'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'x'),
		createToken(TokenType.Comma, ','),
		createToken(TokenType.Ident, 'y'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Ident, 'x'),
		createToken(TokenType.Plus, '+'),
		createToken(TokenType.Ident, 'y'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),

		createToken(TokenType.Let, 'let'),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.Assign, '='),
		createToken(TokenType.Int, '10'),
		createToken(TokenType.Semicolon, ';'),
		
		createToken(TokenType.Let, 'let'),
		createToken(TokenType.Ident, 'valueB'),
		createToken(TokenType.Assign, '='),
		createToken(TokenType.Int, '20'),
		createToken(TokenType.Semicolon, ';'),
		
		createToken(TokenType.Let, 'let'),
		createToken(TokenType.Ident, 'valueC'),
		createToken(TokenType.Assign, '='),
		createToken(TokenType.Int, '10'),
		createToken(TokenType.Semicolon, ';'),
		
		createToken(TokenType.Let, 'let'),
		createToken(TokenType.Ident, 'result'),
		createToken(TokenType.Assign, '='),
		createToken(TokenType.Ident, 'add'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.Comma, ','),
		createToken(TokenType.Ident, 'valueB'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.Semicolon, ';'),
		
		createToken(TokenType.If, 'if'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.LessThan, '<'),
		createToken(TokenType.Ident, 'valueB'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Return, 'return'),
		createToken(TokenType.True, 'true'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),
		
		createToken(TokenType.Else, 'else'),
		createToken(TokenType.If, 'if'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.GreaterThan, '>'),
		createToken(TokenType.Ident, 'valueB'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Return, 'return'),
		createToken(TokenType.False, 'false'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),
		
		createToken(TokenType.Else, 'else'),
		createToken(TokenType.If, 'if'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.Equal, '=='),
		createToken(TokenType.Ident, 'valueC'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Return, 'return'),
		createToken(TokenType.True, 'true'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),
		
		createToken(TokenType.Else, 'else'),
		createToken(TokenType.If, 'if'),
		createToken(TokenType.LParen, '('),
		createToken(TokenType.Ident, 'valueA'),
		createToken(TokenType.NotEqual, '!='),
		createToken(TokenType.Ident, 'valueC'),
		createToken(TokenType.RParen, ')'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Return, 'return'),
		createToken(TokenType.False, 'false'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),
		
		createToken(TokenType.Else, 'else'),
		createToken(TokenType.LBrace, '{'),
		createToken(TokenType.Return, 'return'),
		createToken(TokenType.False, 'false'),
		createToken(TokenType.Semicolon, ';'),
		createToken(TokenType.RBrace, '}'),
		
		createToken(TokenType.Eof, 'eof'),
	];

	console.log('----------------------------------');
	
	const lexer = new Lexer(input);
	for (const tok of testTokens) {
		expect(lexer.nextToken()).toEqual(tok);
	}
});