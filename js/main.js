async function loadNav() {
    try {
        const response = await fetch('components/nav.html');
        if (!response.ok) throw new Error('Nav fetch failed');
        const navHtml = await response.text();
        document.getElementById('nav-placeholder').innerHTML = navHtml;

        const path = window.location.pathname;
        const page = (path.split("/").pop() || "index.html").toLowerCase();

        const navMap = {
            "index.html": "nav-home",
            "experience.html": "nav-experience",
            "travel.html": "nav-travel",
            "waterfalls.html": "nav-waterfalls",
            "photography.html": "nav-photography",
            "contact.html": "nav-contact"
        };

        const activeId = navMap[page];
        if (activeId) {
            const activeElement = document.getElementById(activeId);
            if (activeElement) activeElement.classList.add('active');
        }

        // Mobile Menu Logic
        const navList = document.querySelector('nav ul');
        // Use parentNode to be safe regardless of wrapper class (nav-container or nav-placeholder)
        const navWrapper = navList ? navList.parentNode : null;

        if (navWrapper && navList) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.setAttribute('aria-label', 'Toggle Menu');
            
            // Insert button before the list
            navWrapper.insertBefore(mobileBtn, navList);

            mobileBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
                mobileBtn.innerHTML = navList.classList.contains('active') ? '✕' : '☰';
            });

            // Close menu when a link is clicked
            navList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                    mobileBtn.innerHTML = '☰';
                });
            });
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}
loadNav();