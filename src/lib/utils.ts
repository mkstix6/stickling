export const pseudoRandomMax: number = 2147483647;

export function* pseudoRandom(seed: number) {
	// protect against zero
	if (seed === 0) {
		seed = pseudoRandomMax - 1;
	}
	let value: number = seed;

	while (true) {
		value = (value * 16807) % pseudoRandomMax;
		yield value;
	}
}
