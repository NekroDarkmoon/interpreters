""" This module contains the definition of the Token and TokenType classes."""
from dataclasses import dataclass
from enum import Enum


class TokenType(Enum):
    """The types of tokens that the lexer can handle."""

    # End of parse tokens
    EOF = "EOF"
    ILLEGAL = "ILLEGAL"

    # Types
    IDENT = "IDENT"
    INT = "INT"

    # Delimiters
    COMMA = ","
    SEMICOLON = ";"
    L_PAREN = "("
    R_PAREN = ")"
    L_BRACE = "{"
    R_BRACE = "}"

    # Operators
    ASSIGN = "="
    PLUS = "+"
    MINUS = "-"
    BANG = "!"
    SLASH = "/"
    ASTERISK = "*"
    LESS_THAN = "<"
    GREATER_THAN = ">"
    NOT_EQUAL = "!="
    EQUAL = "=="

    # Keywords
    FUNCTION = "FUNCTION"
    LET = "LET"
    TRUE = "TRUE"
    FALSE = "FALSE"
    IF = "IF"
    ELSE = "ELSE"
    RETURN = "RETURN"


@dataclass
class Token:
    """
    Represents a token with it's type and value.

    Args:
        type (TokenType): The type of the token.
        literal (str): The value of the token.

    Attributes:
        type (TokenType): The type of the token.
        literal (str): The value of the token.
    """

    type: TokenType
    literal: str

    def __init__(self, token_type: TokenType, literal: str):
        self.type = token_type
        self.literal = literal


RESERVED_KEYWORDS = {
    "else": Token(TokenType.ELSE.value, "else"),
    "false": Token(TokenType.FALSE.value, "false"),
    "fn": Token(TokenType.FUNCTION.value, "fn"),
    "if": Token(TokenType.IF.value, "if"),
    "let": Token(TokenType.LET.value, "let"),
    "return": Token(TokenType.RETURN.value, "return"),
    "true": Token(TokenType.TRUE.value, "true"),
}

ACCEPTED_TOKENS = {
    "=": Token(TokenType.ASSIGN.value, TokenType.ASSIGN.value),
    "+": Token(TokenType.PLUS.value, TokenType.PLUS.value),
    "-": Token(TokenType.MINUS.value, TokenType.MINUS.value),
    "!": Token(TokenType.BANG.value, TokenType.BANG.value),
    "/": Token(TokenType.SLASH.value, TokenType.SLASH.value),
    "*": Token(TokenType.ASTERISK.value, TokenType.ASTERISK.value),
    "<": Token(TokenType.LESS_THAN.value, TokenType.LESS_THAN.value),
    ">": Token(TokenType.GREATER_THAN.value, TokenType.GREATER_THAN.value),
    "!=": Token(TokenType.NOT_EQUAL.value, TokenType.NOT_EQUAL.value),
    "==": Token(TokenType.EQUAL.value, TokenType.EQUAL.value),
    ";": Token(TokenType.SEMICOLON.value, TokenType.SEMICOLON.value),
    ",": Token(TokenType.COMMA.value, TokenType.COMMA.value),
    "(": Token(TokenType.L_PAREN.value, TokenType.L_PAREN.value),
    ")": Token(TokenType.R_PAREN.value, TokenType.R_PAREN.value),
    "{": Token(TokenType.L_BRACE.value, TokenType.L_BRACE.value),
    "}": Token(TokenType.R_BRACE.value, TokenType.R_BRACE.value),
    "\0": Token(TokenType.EOF.value, TokenType.EOF.value),
}
