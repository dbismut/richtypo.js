import {
	shortWords,
	hyphenatedWords,
	orphans,
	abbrs,
	ellipses,
	dashesBasic,
	numberUnits,
	degreeSigns,
	quotesFactory,
	numberOrdinalsFactory,
	numberSeparatorsFactory,
	definitions,
} from 'richtypo-rules-common';

const {
	punctuation,
	punctuationOrQuote,
	dash,
	space,
	nbsp,
	hairspace,
	tag,
	notInTag,
} = definitions;
const thousandsSeparator = ',';
const decimalsSeparator = '[.]';
const ordinal = '(st|nd|rd|th)';
const preposition = 'and|the|for';
const openingQuote = '“';
const closingQuote = '”';

// Prepositions
export const prepositions = text =>
	text.replace(
		new RegExp(
			`${notInTag}(?<=^|${space}|${punctuationOrQuote}|>)(${preposition}(${tag})?)${space}`,
			'gmi'
		),
		`$1${nbsp}`
	);

export const dashesAdvanced = text =>
	text
		// Add hair space between , or ) and a dash
		.replace(
			new RegExp(`(${punctuation})${dash}(${space}?)`, 'gmi'),
			`$1${hairspace}—$2`
		)
		// Add hair space between a tag and a dash
		.replace(
			new RegExp(`(?<!\\s)(${tag})${dash}(${space}?)`, 'gmi'),
			`$1${hairspace}—$2`
		)
		// Add hair spaces before and after an em dash
		.replace(
			new RegExp(`(\\S*)${space}?—${space}?`, 'gmi'),
			`<nobr>$1${hairspace}—</nobr>${hairspace}`
		);

export const dashes = [dashesBasic, dashesAdvanced];

export const quotes = quotesFactory({ openingQuote, closingQuote });
export const numberOrdinals = numberOrdinalsFactory({ ordinal });
export const numberSeparators = numberSeparatorsFactory({
	thousandsSeparator,
	decimalsSeparator,
});

export {
	shortWords,
	hyphenatedWords,
	orphans,
	abbrs,
	amps,
	ellipses,
	dashesBasic,
	numberUnits,
	degreeSigns,
} from 'richtypo-rules-common';

// TODO: export defs

// Not in recommended:
// - amps
// - numberOrdinals
// - numberSeparators - breaks years, like "1920"

const recommended = [
	// Common rules
	shortWords,
	hyphenatedWords,
	prepositions,
	orphans,
	abbrs,
	dashes,
	ellipses,
	numberUnits,
	degreeSigns,
	// Custom rules
	quotes,
];

export default recommended;
