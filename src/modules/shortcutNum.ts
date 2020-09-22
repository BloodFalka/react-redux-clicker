function shortcutNumber(
	num: number,
	shortcutSuffixes: Array<string> = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'W',
		'X',
		'Y',
		'Z',
	]
) {
	const normalized = Number(num).toFixed(0)
	const expPosition = normalized.indexOf('e')
	const dotPosition = normalized.indexOf('.')
	const hasExponent = expPosition !== -1
	const exponent = parseInt(normalized.slice(expPosition + 2))
	const len = hasExponent ? expPosition + exponent : normalized.length
	if (len < 4) return String(num)
	const suffixNumber = Math.floor((len - 1) / 3)
	const suffix = shortcutSuffixes[suffixNumber - 1]
	const fullNumber = hasExponent
		? normalized.slice(0, expPosition).replace('.', '') +
		  '0'.repeat(exponent - (dotPosition === -1 ? 0 : expPosition + dotPosition + 1))
		: normalized
	if (!suffix) {
		// число о-о-очень большое, больше чем мы суффиксов задали...
		// return fullNumber.slice(0, -(shortcutSuffixes.length * 3))
		//   + shortcutSuffixes[shortcutSuffixes.length - 1];
		return num
	}
	return fullNumber.slice(0, -(suffixNumber * 3)) + suffix
}

export default shortcutNumber
