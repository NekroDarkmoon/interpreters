import Lexer from "./lexer";

import readline from "readline";

const rs = readline.createInterface({
	input: process.stdin,
});

rs.on('line', (input) => {
	const lexer = new Lexer(input);

	while (true) {
		const token = lexer.nextToken();
		console.log(token);
		if (token.type === 'EOF') break;
	}
});


rs.on('close', () => {
	console.log('Exiting Interpreter!');
	process.exit(0);
});