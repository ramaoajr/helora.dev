import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge only knows Tailwind's built-in scales. Our custom fontSize keys
// (see tailwind.config.js) look like text-COLOR utilities to it, so a normal
// twMerge would drop the size from any `text-<size> text-<color>` pair — which is
// the pattern the whole design system uses. Teaching it the keys keeps both.
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [
				{
					text: [
						'display',
						'display-sm',
						'h2',
						'h2-sm',
						'h3',
						'h4',
						'lead',
						'lead-sm',
						'body',
						'small',
						'micro',
						'eyebrow',
						'stat',
						'stat-sm',
					],
				},
			],
		},
	},
});

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}
