""" Lexer class to tokenize input."""
from __future__ import annotations
from typing import TYPE_CHECKING

from tokens import RESERVED_KEYWORDS, ACCEPTED_TOKENS, TokenType

if TYPE_CHECKING:
    from tokens import Token


class Lexer:
    """
    A lexer built in python that converts a string into tokens.

    Args:
        input (str): The string to tokenize.

    Attributes:
        input (str): The string to tokenize.
        input_length (int): The length of the input string.
        position (int): The current position in the input string.
        read_position (int): The next position to read from the input string.
        ch (str): The current character being read.
    """

    def __init__(self, input) -> None:
        self.input = input
        self.input_length = len(input)
        self.position = 0
        self.read_position = 0
        self.char = ""

        self.read_character()

    def read_character(self) -> None:
        """Reads the next character in the input string."""
        if self.read_position >= self.input_length:
            self.char = "\0"
        else:
            self.char = self.input[self.read_position]

        self.position = self.read_position
        self.read_position += 1

    def next_token(self) -> Token:
        """Returns the next token in the input string."""
        self.skip_whitespace()

        token: Token | None = None
        if self.char in ACCEPTED_TOKENS:
            token = ACCEPTED_TOKENS[self.char]

        if self.char == "=" and self.peek_character() == "=":
            self.read_character()
            token = ACCEPTED_TOKENS["=="]
        elif self.char == "!" and self.peek_character() == "=":
            self.read_character()
            token = ACCEPTED_TOKENS["!="]
        elif self.is_letter(self.char):
            identifier = self.read_identifier()
            if identifier in RESERVED_KEYWORDS:
                return RESERVED_KEYWORDS[identifier]
            return token
        elif self.is_number(self.char):
            number = self.read_number()
            return Token(TokenType.INT.value, number)
        else:
            token = Token(TokenType.ILLEGAL.value, TokenType.ILLEGAL.value)

        self.read_character()
        return token

    def peek_character(self) -> str:
        """Returns the next character in the input string."""
        if self.read_position >= self.input_length:
            return "\0"

        return self.input[self.read_position]

    def read_identifier(self) -> str:
        """Keeps reading the input string as long as a letter is present."""
        pos = self.position
        while self.is_letter(self.char):
            self.read_character()

        return self.input[pos : self.position]

    def read_number(self) -> str:
        """Keeps reading the input string as long as a number is present."""
        pos = self.position
        while self.is_number(self.char):
            self.read_character()

        return self.input[pos : self.position]

    def skip_whitespace(self) -> None:
        """Skips whitespace in the input string and moves current position to
        next tokenizable char."""
        while self.char.isspace():
            self.read_character()

    @staticmethod
    def is_letter(char: str) -> bool:
        """Returns true if the character is a letter."""
        return char.isalpha() or char == "_"

    @staticmethod
    def is_number(char: str) -> bool:
        """Returns true if the character is a number."""
        return char.isdigit()
