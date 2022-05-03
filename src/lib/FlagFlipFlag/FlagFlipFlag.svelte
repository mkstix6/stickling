<script lang="ts">
	import flagColors from 'flag-colors/data/flagColors.json';
	import emojiData from 'emoji.json';

	type EmojiData = {
		codes: string;
		char: string;
		name: string;
		category: string;
		group: string;
		subgroup: string;
	};

	type FlagHexColor = {
		hex: string;
		percent: number;
	};

	type FlagColorsData = {
		name: string;
		url: string;
		colors: FlagHexColor[];
	};

	type FlagDataPlus = FlagColorsData & {
		emoji: string | null;
	};

	const jsonFlagNameDifferences: { flagColorsName: string; emojiName: string }[] = [
		{ flagColorsName: 'Ivory Coast', emojiName: 'flag: Côte d’Ivoire' },
		{ flagColorsName: 'FS Micronesia', emojiName: 'flag: Micronesia' },
		{
			flagColorsName: 'Saint Vincent and the Grenadines',
			emojiName: 'flag: St. Vincent & Grenadines',
		},
		{ flagColorsName: 'Myanmar', emojiName: 'flag: Myanmar (Burma)' },
		{ flagColorsName: 'Macedonia', emojiName: 'flag: North Macedonia' },
		{ flagColorsName: 'Swaziland', emojiName: 'flag: Eswatini' },
		{
			flagColorsName: 'State of Palestine',
			emojiName: 'flag: Palestinian Territories',
		},
	];

	const flagDataPlusEmoji: FlagDataPlus[] = flagColors.map((flag: FlagColorsData): FlagDataPlus => {
		// Set up our new object
		const flagPlusEmoji: FlagDataPlus = { emoji: null, ...flag };
		// Specific fixes
		jsonFlagNameDifferences.forEach(({ flagColorsName, emojiName }) => {
			if (flagPlusEmoji.emoji === null && flag.name === flagColorsName) {
				flagPlusEmoji.emoji =
					emojiData.find((emoji) => emoji.name === `${emojiName}`)?.char || null;
			}
		});
		// Ideal simple general case solve. Inexhaustive, will miss some items.
		if (flagPlusEmoji.emoji === null) {
			flagPlusEmoji.emoji =
				emojiData.find((emoji) => emoji.name === `flag: ${flag.name}`)?.char || null;
		}
		// Spelling difference: Check for and -> &
		if (flagPlusEmoji.emoji === null) {
			flagPlusEmoji.emoji =
				emojiData.find((emoji) => emoji.name === `flag: ${flag.name.replace(' and ', ' & ')}`)
					?.char || null;
		}
		// Spelling difference: Check for Saint -> St.
		if (flagPlusEmoji.emoji === null) {
			flagPlusEmoji.emoji =
				emojiData.find((emoji) => emoji.name === `flag: ${flag.name.replace('Saint ', 'St. ')}`)
					?.char || null;
		}
		// Spelling difference: Check for preceeding 'the'
		if (flagPlusEmoji.emoji === null) {
			flagPlusEmoji.emoji =
				emojiData.find((emoji) => emoji.name === `flag: ${flag.name.replace('the ', '')}`)?.char ||
				null;
		}
		// Spelling difference: Check for both 'and' and 'saint' issues combined.
		if (flagPlusEmoji.emoji === null) {
			flagPlusEmoji.emoji =
				emojiData.find(
					(emoji) =>
						emoji.name === `flag: ${flag.name.replace('Saint', 'St. ').replace(' and ', ' & ')}`
				)?.char || null;
		}
		// Return what we have
		return flagPlusEmoji;
	});

	const flagEmoji: EmojiData[] = emojiData.filter((emoji) => emoji.group === 'Flags');
	const unusedFlags: EmojiData[] = flagEmoji.filter(
		(emoji) => !flagDataPlusEmoji.some((flag: FlagDataPlus) => flag.emoji === emoji.char)
	);
</script>

<h2 class="mt3 mb1">Unused emoji flags</h2>
<div class="flags">
	{#each unusedFlags as { name, char }}
		<div>
			{char}
			{name}
		</div>
	{/each}
</div>

<h2 class="mt3 mb1">Flags with flag color data</h2>
<div class="flags">
	{#each flagDataPlusEmoji as flag}
		<div class:noflag={!flag.emoji}>
			{flag.emoji}
			{flag.name}
		</div>
	{/each}
</div>

<style>
	.flags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.flags > div {
		border-top: 1px solid #fff2;
		border-right: 1px solid #fff1;
		border-bottom: 1px solid #0006;
		border-left: 1px solid #fff1;
		background: #0009;
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
	}

	.noflag {
		color: red;
	}
</style>
