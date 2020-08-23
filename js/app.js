/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const menu = document.getElementById("navbar__list");
// a variable used to hide the navigation bar
var hide;
const topButton = document.getElementById('top-button');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInViewport(element) {
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const box = element.getBoundingClientRect();
    if (box.top >= 0 && box.bottom <= windowHeight)
        return true;
    return false;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    const fragment = document.createDocumentFragment();
    for (let sec of sections) {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#' + sec.id;
        anchor.className = "menu__link";
        anchor.setAttribute('data-id', sec.id);
        anchor.textContent = sec.getAttribute('data-nav');
        li.appendChild(anchor);
        fragment.appendChild(li);
    }
    menu.appendChild(fragment);
}

buildNav();

// Add class 'active' to section when near top of viewport

function updateActiveSection() {
    menu.classList.remove('hidden');
    for (let sec of sections) {
        if (!isInViewport(sec)) {
            sec.classList.remove('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.remove('selected');
        }
        else {
            sec.classList.add('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.add('selected');
        }
    }
    window.clearTimeout(hide);
    // hide navigation bar when not scrolling
    hide = setTimeout(() => {
        menu.classList.add("hidden");
    }, 3000);

    // add top button when the window is not at the top
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(evt) {
    const link = evt.target;
    if (link.nodeName == 'A') {
        evt.preventDefault();
        const element = document.getElementById(link.getAttribute('data-id'));
        element.scrollIntoView({behavior:"smooth"});
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

menu.addEventListener('click', scrollToSection);

// Set sections as active

window.addEventListener("scroll", updateActiveSection);


// scroll to top when top button is clicked
topButton.addEventListener('click', function(){
    document.querySelector('main').scrollIntoView({behavior:"smooth"});
});