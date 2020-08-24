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
const topButton = document.getElementById('top-button');
// a variable used to hide the navigation bar
var hide;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// this function return the visible height of the section in the viewport
function getVisibleHeight(element) {
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const box = element.getBoundingClientRect();
    const top = Math.min(Math.max(box.top, 0), windowHeight);
    const bottom = Math.min(Math.max(box.bottom, 0), windowHeight);
    return bottom - top;
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

function scrollHandler() {
    // make the navbar hidden
    menu.classList.remove('hidden');

    // Add class 'active' to section when near top of viewport
    // loop over sections and get the section that has the max visible height
    let mx = 0;
    let active = sections[0];
    for (let sec of sections) {
        let height = getVisibleHeight(sec);
        if (height > mx) {
            mx = height;
            active = sec;
        } else if (height < mx) {
            // all of the next sections will be less in height, so break
            break;
        }
    }
    for (const sec of sections) {
        if (getVisibleHeight(sec) < mx && sec.classList.contains('your-active-class')) {
            sec.classList.remove('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.remove('selected');
        } else if (getVisibleHeight(sec) == mx && !sec.classList.contains('your-active-class')) {
            sec.classList.add('your-active-class');
            let link = document.querySelector('a[data-id='+sec.id+']');
            link.classList.add('selected');
        }
    }

    // hide navigation bar when not scrolling
    window.clearTimeout(hide);
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

window.addEventListener("scroll", scrollHandler);


// scroll to top when top button is clicked
topButton.addEventListener('click', function(){
    document.querySelector('main').scrollIntoView({behavior:"smooth"});
});