// ------------------------------
// PRELOADER ANIMATION LOGIC
// ------------------------------
window.addEventListener('load', () => {
    const logo = document.getElementById('preloader-logo');
    const overlay = document.querySelector('.reveal-overlay');
    const preloader = document.querySelector('.preloader');

    // Wait for the logo to load before animating
    if (logo.complete) {
        setTimeout(() => {
            animateReveal();
        }, 1000);
    } else {
        setTimeout(() => {
            animateReveal();
        }, 1000);
    }

    // Animation sequence for revealing the page
    function animateReveal() {
        logo.style.opacity = '1';
        overlay.style.transform = 'translateX(100%)';

        // Fade out preloader after animation
        setTimeout(() => {
            preloader.style.transition = 'opacity 1s ease';
            preloader.style.opacity = '0';

            // Fully hide preloader after fade
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 4000);
    }
});

// ------------------------------
// PORTAL LINKS OBJECT
// ------------------------------
const links = {
    office365: "https://m365.cloud.microsoft/apps/?auth=2",
    ministry: "https://mofep.gov.gh",
    docem: "https://docem.mofep.gov.gh/DOCEM.UI/login",
    outlook: "https://outlook.office.com/mail/",
    sharepoint: "https://mofghana.sharepoint.com/",
    official: "https://mofep.gov.gh",
    onedrive: "https://mofghana-my.sharepoint.com/",
    example: "https://example.com"
};

// ------------------------------
// OPEN LINK IN NEW TAB
// ------------------------------
function openLink(key) {
    const url = links[key];
    if (url) {
        window.open(url, "_blank");
    } else {
        console.error(`Link for '${key}' not found.`);
    }
}

// ------------------------------
// DETECT MOBILE DEVICE AND SHOW WARNING
// ------------------------------
function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

window.onload = function () {
    if (isMobileDevice()) {
        // Hide desktop content
        document.getElementById('desktopView').style.display = 'none';
        document.getElementById('mobileView').style.display = 'block';

        // Show warning with SweetAlert
        Swal.fire({
            icon: 'warning',
            title: 'Mobile Device Detected',
            text: 'Please visit this site on a desktop device.',
            confirmButtonText: 'OK',
            allowOutsideClick: false
        });
    }
};

// ------------------------------
// TOGGLE SEARCH PANEL
// ------------------------------
function togglePanel() {
    const panel = document.getElementById("sidePanel");
    const hamburger = document.querySelector(".hamburger");
    const closeBtn = document.querySelector(".close");

    panel.classList.toggle("open");
    hamburger.classList.toggle("active");
    closeBtn.classList.toggle("active");
}

// ------------------------------
// SEARCH FUNCTIONALITY
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    let ministries = [];

    // Load ministries list from JSON
    fetch("./data/links.json")
        .then(response => response.json())
        .then(data => {
            ministries = data;
        })
        .catch(error => console.error("Error loading ministries:", error));

    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const resultsContainer = document.querySelector('.search-results');

    // Handle search input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.length > 0) {
            const filtered = ministries.filter(ministry =>
                ministry.name.toLowerCase().includes(query)
            );

            // Show filtered search results
            filtered.forEach((ministry, index) => {
                const li = document.createElement("li");
                li.style.animationDelay = `${index * 0.05}s`;
                li.innerHTML = `<a href="${ministry.url}" target="_blank">${ministry.name}</a>`;
                resultsContainer.appendChild(li);
            });
        }
    });
});
