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
    "else": Token(TokenType.ELSE, "else"),
    "false": Token(TokenType.FALSE, "false"),
    "fn": Token(TokenType.FUNCTION, "fn"),
    "if": Token(TokenType.IF, "if"),
    "let": Token(TokenType.LET, "let"),
    "return": Token(TokenType.RETURN, "return"),
    "true": Token(TokenType.TRUE, "true"),
}
