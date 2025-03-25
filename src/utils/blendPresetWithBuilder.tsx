export function blendPresetWithBuilder(
	preset: string,
	builder: {
		startsWith?: string;
		contains?: string;
		endsWith?: string;
		exactString?: string;
		minLength?: string;
		maxLength?: string;
	}
): string {
	const { startsWith, contains, endsWith, exactString, minLength, maxLength } =
		builder;
	console.log(
		startsWith,
		contains,
		endsWith,
		exactString,
		minLength,
		maxLength
	);

	if (exactString) return `^${exactString}$`;

	let updatedPreset = preset;

	// Identifica quale preset è stato selezionato (con slash normali, leggibili)
	const isEmailPreset =
		preset === '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
	const isUrlPreset =
		preset === '^(https?://)?(www.)?[a-zA-Z0-9-]+.[a-zA-Z]{2,}(/\\S*)?$';
	const isPhonePreset = preset === '^+?d{7,15}$';
	const isDatePreset = preset === '^d{4}-d{2}-d{2}$';

	console.log('startWith +', startsWith);
	console.log('contains +', contains);
	console.log('endsWith +', endsWith);
	console.log('exactString +', exactString);
	console.log('minLength +', minLength);
	console.log('maxLength +', maxLength);
	console.log('Preset -', preset);
	console.log('isEmailPreset -', isEmailPreset);
	// Email – modifica parte locale
	if (isEmailPreset && startsWith) {
		updatedPreset = preset.replace(
			/^[^\s@]+@/,
			`${startsWith}[a-zA-Z0-9._%+-]*@`
		);
	}

	// URL – modifica dominio
	if (isUrlPreset && startsWith) {
		updatedPreset = preset.replace(
			/([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})/,
			`${startsWith}[a-zA-Z0-9-]*$2`
		);
	}

	// Phone – aggiunta prefisso
	if (isPhonePreset && startsWith) {
		updatedPreset = preset.replace(/^\^\+?/, `^\\+?${startsWith}`);
	}

	// Date – nessuna modifica su startsWith (pattern rigido)

	// Contains – aggiunta lookahead
	if (contains) {
		updatedPreset = updatedPreset.replace(/^(\^)?/, `^(?=.*${contains})`);
	}

	// EndsWith – lookahead su fine stringa
	if (endsWith) {
		updatedPreset = updatedPreset.replace(/^(\^)?/, `^(?=.*${endsWith}$)`);
	}

	// Vincoli di lunghezza
	if (minLength || maxLength) {
		const lenConstraint =
			minLength && maxLength
				? `(?=.{${minLength},${maxLength}}$)`
				: minLength
				? `(?=.{${minLength},}$)`
				: `(?=.{0,${maxLength}}$)`;

		const corePattern = updatedPreset.replace(/^(\^)?/, '').replace(/\$$/, '');

		updatedPreset = `^${lenConstraint}${corePattern}$`;
	}

	console.log('Updated Preset: ', updatedPreset);

	return updatedPreset;
}
