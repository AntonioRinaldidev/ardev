export const ThemeScript = () => {
	const scriptCode = `
    (function() {
      try {
        // La tua lista di temi deve essere speculare a quella del Redux Slice
        var themes = [
            'artic-deep',
            'violet',
            'mint',
            'neon',
            'dark-minimal',
            'minimal',
        ];
        
        var savedTheme = localStorage.getItem('theme');
        var html = document.documentElement;

        // Se abbiamo un tema salvato valido, usalo
        if (savedTheme && themes.includes(savedTheme)) {
          html.classList.add(savedTheme);
        } else {
          // Fallback: Default theme (deve corrispondere all'initialState del tuo slice)
          html.classList.add('dark-minimal');
        }
      } catch (e) {}
    })();
  `;

	return (
		<script
			id='theme-script'
			dangerouslySetInnerHTML={{ __html: scriptCode }}
		/>
	);
};
