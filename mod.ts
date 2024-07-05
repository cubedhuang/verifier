const raw = (await Deno.readTextFile("./words.txt")).replaceAll("\r\n", "\n");

const words = raw.split("\n").filter(x => x.length > 0);

const syllable =
	/[bcdghjklmnpstw]?(?=[aeiou])(?:[aeiou]|ai|au|oi)n?(?![aeiou])/g;
const check =
	/^(?:[bcdghjklmnpstw]?(?=[aeiou])(?:[aeiou]|ai|au|oi)n?(?![aeiou]))+$/;
const forbidden = /wu|ji|[aeiou]nn[aeiou]|nm/;

for (const word of words) {
	if (!check.test(word) || forbidden.test(word)) {
		console.log("Invalid:", word);
	}
}

console.log();

const pairs = [
	["p", "b"],
	["t", "d"],
	["k", "g"],
	["k", "h"],
	["h", ""],
	["i", "e"],
	["u", "o"],
	["ih", "ij"],
	["uw", "uh"],
	["ci", "ti"],
	["ti", "si"]
];

for (let i = 0; i < words.length; i++) {
	const a = words[i];

	for (let j = i + 1; j < words.length; j++) {
		const b = words[j];

		for (const [x, y] of pairs) {
			if (a.replaceAll(x, y) === b || b.replaceAll(x, y) === a) {
				console.log(`${a} <=> ${b} | ${x} <=> ${y}`);
			}
		}
	}
}

console.log();

const syllableCounts = new Map<string, number>();

for (const word of words) {
	for (const match of word.matchAll(syllable)) {
		const syll = match[0];

		if (!syllableCounts.has(syll)) {
			syllableCounts.set(syll, 0);
		}

		syllableCounts.set(syll, syllableCounts.get(syll)! + 1);
	}
}

const sorted = [...syllableCounts.entries()].sort((a, b) => b[1] - a[1]);

for (const [syll, count] of sorted) {
	console.log(syll, count);
}

console.log();

const letters = new Map<string, number>();

for (const word of words) {
	for (const letter of word) {
		if (!letters.has(letter)) {
			letters.set(letter, 0);
		}

		letters.set(letter, letters.get(letter)! + 1);
	}
}

const sortedLetters = [...letters.entries()].sort((a, b) => b[1] - a[1]);

for (const [letter, count] of sortedLetters) {
	console.log(letter, count);
}
