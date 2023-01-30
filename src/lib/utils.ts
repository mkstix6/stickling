export const pseudoRandomMax = 2147483647;

export function* pseudoRandom(seed: number) {
	// protect against zero
	if (seed === 0 || seed === null || seed === undefined) {
		seed = pseudoRandomMax - 1;
	}
	let value: number = seed;

	while (true) {
		value = (value * 16807) % pseudoRandomMax;
		yield value;
	}
}

export function randomInt(): number {
	return Math.ceil(Math.random() * 674365);
}

export const clamp = (value: number, min = -Infinity, max = Infinity): number =>
	value < min ? min : value > max ? max : value;
