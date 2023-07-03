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

type TokenItem = typeof TokenType[keyof typeof TokenType];

export interface Token {
    type: TokenItem;
    literal: string;
}