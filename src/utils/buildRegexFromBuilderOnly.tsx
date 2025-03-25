export function buildRegexFromBuilderOnly(builder: {
	startsWith?: string;
	contains?: string;
	endsWith?: string;
	exactString?: string;
	minLength?: string;
	maxLength?: string;
}): string {
	const { startsWith, contains, endsWith, exactString, minLength, maxLength } =
		builder;

	// Se è stato indicato "Exact String", priorità assoluta
	if (exactString) return `^${exactString}$`;

	let pattern = "";

	if (startsWith) pattern += `^${startsWith}`;
	if (contains) pattern += `.*${contains}.*`;
	if (!startsWith && !contains) pattern += `.*`; // fallback
	if (endsWith) pattern += `${endsWith}$`;

	// Vincoli di lunghezza
	if (minLength || maxLength) {
		const lengthConstraint =
			minLength && maxLength
				? `(?=.{${minLength},${maxLength}})`
				: minLength
				? `(?=.{${minLength},})`
				: `(?=.{0,${maxLength}})`;
		pattern = `${lengthConstraint}${pattern}`;
	}

	return pattern;
}
