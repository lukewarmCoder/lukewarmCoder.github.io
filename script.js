const line1 = "Hi, I'm Luke.";
const line2 = "An aspiring software developer."

const line1Cursor = document.getElementById('line1-cursor');
const line2Cursor = document.getElementById('line2-cursor');

// Resuable sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typewriter function
function typeText(elementId, text, speed, callback) {
  
    const element = document.getElementById(elementId);
    var index = 0;

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

// Begin program execution
typeText('line1', line1, 80, async function() {
  
    await sleep(800); // Short pause
    line1Cursor.style.display = 'inline'; // Remove the line1 cursor
    line2Cursor.style.display = 'inline-block'; // Show the line2 cursor

    typeText('line2', line2, 60);
});




const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".navList");

mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navList.classList.toggle("active");
});

// Close the mobile menu when you click on a link.
const navLinks = document.querySelectorAll("nav ul li a");
const menu_toggle = document.querySelector('.menu-toggle')

function closeMobileMenu() {
    navList.classList.remove('active'); // Close the menu when clicked
    mobileMenu.classList.toggle("active");
}

// Loop through the NodeList
navLinks.forEach(navLink => {
  navLink.addEventListener("click", () => {
    if (getComputedStyle(menu_toggle).display == 'flex') closeMobileMenu();
  });
});

// Close the mobile menu when you click on the body
const secondSpan = document.querySelector('.menu-toggle span:nth-child(2)');
const header = document.getElementsByTagName('header')[0];

document.addEventListener('click', (event) => {
    // Check if the click happened outside the header and nav list
    if (!header.contains(event.target)) {
        if (getComputedStyle(secondSpan).opacity == 0) closeMobileMenu();
    }
});
