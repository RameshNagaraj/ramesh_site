(function() {
    console.log("Theme script loaded");

    const initTheme = () => {
        if (document.getElementById('theme-toggle')) {
            console.log("Theme toggle already exists");
            return;
        }

        console.log("Creating theme toggle...");
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        toggleBtn.innerHTML = '🌙'; // Default icon

        // Fallback styles in case CSS is cached or fails
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '20px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.zIndex = '99999';

        // Safe localStorage access
        let savedTheme = 'light';
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.warn('LocalStorage access denied', e);
        }

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.innerHTML = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                toggleBtn.innerHTML = '🌙';
                try { localStorage.setItem('theme', 'light'); } catch (e) {}
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                toggleBtn.innerHTML = '☀️';
                try { localStorage.setItem('theme', 'dark'); } catch (e) {}
            }
        });

        document.body.appendChild(toggleBtn);
        console.log("Theme toggle appended to body");
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        // If body exists, run immediately
        if (document.body) initTheme();
        else document.addEventListener('DOMContentLoaded', initTheme);
    }
})();