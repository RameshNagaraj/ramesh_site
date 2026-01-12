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
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}
loadNav();