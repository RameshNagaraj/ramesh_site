async function loadNav() {
    try {
        const response = await fetch('components/nav.html');
        if (!response.ok) throw new Error('Nav fetch failed');
        const navHtml = await response.text();
        document.getElementById('nav-placeholder').innerHTML = navHtml;

        const path = window.location.pathname;
        const page = path.split("/").pop() || "index.html";

        const navMap = {
            "index.html": "nav-home",
            "experience.html": "nav-experience",
            "travel.html": "nav-travel",
            "photography.html": "nav-photography",
            "contact.html": "nav-contact"
        };

        const activeId = navMap[page];
        if (activeId) {
            const activeElement = document.getElementById(activeId);
            if (activeElement) activeElement.classList.add('active');
        }

        // Mobile Menu Logic
        const navContainer = document.querySelector('.nav-container');
        const navList = document.querySelector('nav ul');

        if (navContainer && navList) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.setAttribute('aria-label', 'Toggle Menu');
            navContainer.insertBefore(mobileBtn, navList);

            mobileBtn.addEventListener('click', () => {
                navList.classList.toggle('active');
                mobileBtn.innerHTML = navList.classList.contains('active') ? '✕' : '☰';
            });
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}
loadNav();