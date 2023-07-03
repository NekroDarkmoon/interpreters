import { TokenType, Token, KEYWORDS } from "./lexerTypes";

import isLetter from "../utils/isLetter";
import isNumber from "../utils/isNumber";
import createToken from "../utils/createToken";

export default class Lexer {
	private position: number = 0;

	private readPosition: number = 0;

	private ch: string;

	constructor(private input: string) {
			this.readCharacter();
	}

	private readCharacter(): void {
		// Terminate if we've reached the end of the input
		if (this.readPosition >= this.input.length) this.ch = '\0';
		else this.ch = this.input[this.readPosition];

		this.position = this.readPosition;
		this.readPosition += 1;
	}

	nextToken(): Token {
		const token = this.getNextToken();
		this.readCharacter();

		return token;
	}

	private getNextToken(): Token {
		this.skipWhitespace();

		if (this.ch === '{') return createToken(TokenType.LBrace, this.ch);
		if (this.ch === '}') return createToken(TokenType.RBrace, this.ch);
		if (this.ch === '(') return createToken(TokenType.LParen, this.ch);
		if (this.ch === ')') return createToken(TokenType.RParen, this.ch);
		if (this.ch === ',') return createToken(TokenType.Comma, this.ch);
		if (this.ch === ';') return createToken(TokenType.Semicolon, this.ch);
		if (this.ch === '+') return createToken(TokenType.Plus, this.ch);
		if (this.ch === '-') return createToken(TokenType.Minus, this.ch);
		if (this.ch === '*') return createToken(TokenType.Asterisk, this.ch);
		if (this.ch === '/') return createToken(TokenType.ForwardSlash, this.ch);
		if (this.ch === '<') return createToken(TokenType.LessThan, this.ch);
		if (this.ch === '>') return createToken(TokenType.GreaterThan, this.ch);
		if (this.ch === '\0') return createToken(TokenType.Eof, 'eof')
		
		if (this.ch === '=') {
			if (this.peekCharacter() === '=') { this.readCharacter(); return createToken(TokenType.Equal, '=='); }
			else return createToken(TokenType.Assign, this.ch);
		}
		
		if (this.ch === '!') {
			if (this.peekCharacter() === '=') { this.readCharacter(); return createToken(TokenType.NotEqual, '!='); }
			else return createToken(TokenType.Bang, this.ch);
		}

		if (isLetter(this.ch)) {
			const identifier = this.readIdentifier();
			const keyword = KEYWORDS[identifier as keyof typeof KEYWORDS];
			if (keyword) return keyword;

			return createToken(TokenType.Ident, identifier);
		}

		if (isNumber(this.ch)) {
			const number = this.readNumber();
			return createToken(TokenType.Int, number);
		}

		return createToken(TokenType.Illegal, this.ch);
	}

	private peekCharacter(): string {
		if (this.readPosition >= this.input.length) return '\0';
		else return this.input[this.readPosition];
	}

	private readIdentifier(): string {
		const pos = this.position;
		while (isLetter(this.ch)) this.readCharacter();
		return this.input.slice(pos, this.position);
	}

	private readNumber(): string {
		const pos = this.position;
		while (isNumber(this.ch)) this.readCharacter();
		return this.input.slice(pos, this.position);
	}

	private skipWhitespace(): void {
		while ([' ', '\t', '\n', '\r'].includes(this.ch)) this.readCharacter();
	}

}
