
// Typewriter text configuration
const line1 = "Hi, I'm Luke.";
const line2 = "An aspiring backend developer.";

// DOM elements
const line1Cursor = document.getElementById('line1-cursor');
const line2Cursor = document.getElementById('line2-cursor');
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".navList");
const navLinks = document.querySelectorAll("nav ul li a");
const menuToggle = document.querySelector('.menu-toggle');
const header = document.getElementsByTagName('header')[0];

// Hide line2 cursor initially
if (line2Cursor) {
    line2Cursor.style.display = 'none';
}

// Reusable sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typewriter function
function typeText(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text[index]; // Add one character at a time
            index++;
            setTimeout(type, speed); // Repeat with a delay
        } else {
            if (callback) callback();
        }
    }

    type();
}

// Close mobile menu function
function closeMobileMenu() {
    if (navList) navList.classList.remove('active'); // Close the menu when clicked
    if (mobileMenu) mobileMenu.classList.remove("active");
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Begin typewriter animation
    if (document.getElementById('line1')) {
        typeText('line1', line1, 80, async function() {
            await sleep(800); // Short pause
            if (line1Cursor) line1Cursor.style.display = 'none'; // Hide the line1 cursor
            if (line2Cursor) line2Cursor.style.display = 'inline-block'; // Show the line2 cursor
            typeText('line2', line2, 60);
        });
    }

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("active");
            navList.classList.toggle("active");
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", () => {
            if (menuToggle && window.getComputedStyle(menuToggle).display === 'flex') {
                closeMobileMenu();
            }
        });
    });

    // Close the mobile menu when clicking outside the menu
    document.addEventListener('click', (event) => {
        if (navList && navList.classList.contains('active') && header && !header.contains(event.target)) {
            closeMobileMenu();
        }
    });
});
