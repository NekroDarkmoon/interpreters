const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);

const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);

const _ = '_'.charCodeAt(0);

export default function isLetter(char: string): boolean {
	const charCode = char.charCodeAt(0);
	return (a <= charCode && z >= charCode)
		|| (A <= charCode && Z >= charCode)
		|| charCode === _;
}