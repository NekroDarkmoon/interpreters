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
		const { token, readNext } = this.getNextToken();
		if (readNext) this.readCharacter();
		return token;
	}

	private getNextToken(): {token: Token, readNext: boolean} {
		this.skipWhitespace();

		if (this.ch === '{') return { token: createToken(TokenType.LBrace, this.ch), readNext: true };
		if (this.ch === '}') return { token: createToken(TokenType.RBrace, this.ch), readNext: true };
		if (this.ch === '(') return { token: createToken(TokenType.LParen, this.ch), readNext: true };
		if (this.ch === ')') return { token: createToken(TokenType.RParen, this.ch), readNext: true };
		if (this.ch === ',') return { token: createToken(TokenType.Comma, this.ch), readNext: true };
		if (this.ch === ';') return { token: createToken(TokenType.Semicolon, this.ch), readNext: true };
		if (this.ch === '+') return { token: createToken(TokenType.Plus, this.ch), readNext: true };
		if (this.ch === '-') return { token: createToken(TokenType.Minus, this.ch), readNext: true };
		if (this.ch === '*') return { token: createToken(TokenType.Asterisk, this.ch), readNext: true };
		if (this.ch === '/') return { token: createToken(TokenType.ForwardSlash, this.ch), readNext: true };
		if (this.ch === '<') return { token: createToken(TokenType.LessThan, this.ch), readNext: true };
		if (this.ch === '>') return { token: createToken(TokenType.GreaterThan, this.ch), readNext: true };
		if (this.ch === '\0') return { token: createToken(TokenType.Eof, 'eof'), readNext: false };
		
		if (this.ch === '=') {
			if (this.peekCharacter() === '=') { this.readCharacter(); return { token:  createToken(TokenType.Equal, '=='), readNext: true }; } 
			else return { token:  createToken(TokenType.Assign, this.ch), readNext: true} ;
		}
		
		if (this.ch === '!') {
			if (this.peekCharacter() === '=') { this.readCharacter(); return { token: createToken(TokenType.NotEqual, '!='), readNext: true }; }
			else return { token: createToken(TokenType.Bang, this.ch), readNext: true };
		}

		if (isLetter(this.ch)) {
			const identifier = this.readIdentifier();
			const keyword = KEYWORDS[identifier as keyof typeof KEYWORDS];
			if (keyword) return { token: keyword, readNext: false };

			return { token: createToken(TokenType.Ident, identifier), readNext: false };
		}

		if (isNumber(this.ch)) {
			const number = this.readNumber();
			return { token: createToken(TokenType.Int, number), readNext: false };
		}

		return { token: createToken(TokenType.Illegal, this.ch), readNext: false };
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
