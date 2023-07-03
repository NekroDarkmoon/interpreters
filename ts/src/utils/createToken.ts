import { TokenItem } from "../lexer/lexerTypes";

export default function createToken(type: TokenItem, literal: string) {
	return { type, literal }
}