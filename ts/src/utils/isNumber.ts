const _0 = '0'.charCodeAt(0);
const _9 = '9'.charCodeAt(0);

export default function isNumber(char: string): boolean {
	const charCode = char.charCodeAt(0);
	return _0 <= charCode && _9 >= charCode; 
}