'use client';

export function ThemeInitWrapper() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
(function() {
	const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'];
	const html = document.documentElement;
	const saved = localStorage.getItem('theme');
	const selected = themes.includes(saved) ? saved : 'violet';
	html.classList.remove(...themes);
	html.classList.add(selected);
})();
        `,
			}}
		/>
	);
}
